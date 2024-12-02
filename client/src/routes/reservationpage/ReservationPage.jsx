import "./reservationpage.scss";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useState, useEffect, useContext } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../context/authContext";

function ReservationPage() {
  const { currentUser } = useContext(AuthContext);
  const [facilities, setFacilities] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Fetch facilities from the API
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch("/api/facilities");
        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }
        const data = await response.json();
        console.log("Fetched facilities:", data);
        setFacilities(data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setError("Failed to fetch facilities");
      }
    };

    fetchFacilities();
  }, []);

  console.log("Facilities state:", facilities);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    const facilityId = document.getElementById("facility").value;
    const purpose = document.getElementById("purpose").value;

    const startDate = new Date(dateRange[0].startDate).toLocaleDateString(
      "en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }
    );
    const endDate = new Date(dateRange[0].endDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const rsvDate = `${startDate} - ${endDate}`;

    const startTime = new Date(
      `1970-01-01T${document.getElementById("startTime").value}:00Z`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(
      `1970-01-01T${document.getElementById("endTime").value}:00Z`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const rsvTime = `${startTime} - ${endTime}`;

    // Reservations data
    const reservationData = {
      userId: currentUser.id,
      facilityId,
      rsvDate,
      rsvTime,
      purpose,
      description,
      progress: "Pending",
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      // Check if the response is OK before parsing
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Log the response body
        throw new Error(errorData.message || "Failed to submit reservation.");
      }

      const result = await response.json();
      console.log("Reservation submitted successfully:", result);
      alert("Reservation submitted!");
    } catch (error) {
      setError(error.message);
      console.error("Error submitting reservation:", error.message);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="ReservationPage">
      <div className="formContainer">
        <h1>Reserve a Facility</h1>
        <div className="wrapper">
          <form>
            {/* Event Title */}
            <div className="item">
              <label htmlFor="title">Event Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter event title"
              />
            </div>

            {/* Facility Selection */}
            <div className="item">
              <label htmlFor="facility">Facility</label>
              <select id="facility" name="facility">
                <option value="">Select a Facility</option>
                {facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.title}{" "}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="item">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter event description"
              />
            </div>

            {/* Purpose of Reservation */}
            <div className="item">
              <label htmlFor="purpose">Purpose of Reservation</label>
              <input
                id="purpose"
                name="purpose"
                type="text"
                placeholder="Enter purpose of reservation"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Calendar and Time Selection */}
      <div className="calendarContainer">
        <h2>Select Date and Time</h2>
        <div className="calendar">
          <DateRangePicker
            ranges={dateRange}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            rangeColors={["#4299e1"]}
          />
        </div>
        <div className="timeSelection">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" id="startTime" name="startTime" />

          <label htmlFor="endTime">End Time</label>
          <input type="time" id="endTime" name="endTime" />
        </div>
        <button className="submitButton" onClick={handleSubmit}>
          Send Reservation
        </button>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default ReservationPage;
