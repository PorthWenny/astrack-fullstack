import "./reservationpage.scss";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useState, useEffect, useContext } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../context/authContext";
import Alert from "../../components/alert/Alert";

function ReservationPage() {
  const { currentUser } = useContext(AuthContext);
  const [facilities, setFacilities] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/facilities");
        if (!response.ok) {
          throw new Error("Failed to fetch facilities");
        }
        const data = await response.json();
        setFacilities(data);
      } catch (error) {
        console.error("Error fetching facilities:", error.message);
        setError("Failed to fetch facilities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    const title = document.getElementById("title").value.trim();
    const facilityId = document.getElementById("facility").value;
    const department = document.getElementById("department").value.trim();
    const startTimeValue = document.getElementById("startTime").value;
    const endTimeValue = document.getElementById("endTime").value;
    const cleanDescription = description.trim().replace(/<\/?[^>]+(>|$)/g, "");

    if (
      !title ||
      !facilityId ||
      !department ||
      !description ||
      !startTimeValue ||
      !endTimeValue ||
      !dateRange[0]
    ) {
      setAlert({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Format time into "00:00 AM/PM"
    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const date = new Date();
      date.setHours(hour, minute);

      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    const formattedStartTime = formatTime(startTimeValue);
    const formattedEndTime = formatTime(endTimeValue);

    // Format date into "MM-DD-YYYY"
    const formatDate = (date) => {
      const options = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        timeZone: "Asia/Manila",
      };
      return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    };

    const startDate = formatDate(dateRange[0].startDate);
    const endDate = formatDate(dateRange[0].endDate);

    // Determine reservation date format
    const rsvDate =
      startDate === endDate ? startDate : `${startDate} - ${endDate}`;

    const reservationData = {
      userId: currentUser.id,
      facilityId,
      rsvDate,
      rsvTime: `${formattedStartTime} - ${formattedEndTime}`,
      title,
      department,
      description: cleanDescription,
      progress: "Pending",
    };

    // Fetch all reservations (no filter yet)
    try {
      const response = await fetch("/api/reservations");
      if (!response.ok) {
        throw new Error("Failed to fetch reservations.");
      }

      const allReservations = await response.json();

      // Filter for approved reservations
      const approvedReservations = allReservations.filter(
        (reservation) =>
          reservation.progress === "Approved" &&
          reservation.facilityId === facilityId
      );

      // Helper function to convert AM/PM time to 24-hour format
      const convertTo24HourFormat = (timeStr) => {
        let [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
      };

      // Helper function to create a Date object from date and time strings
      const createDateTime = (dateStr, timeStr) => {
        const time24Hr = convertTo24HourFormat(timeStr);
        return new Date(`${dateStr} ${time24Hr}`);
      };

      // check for overlapping reservations
      const isOverlap = approvedReservations.some((reservation) => {
        const [startDate, endDate] = reservation.rsvDate.split(" - ");
        const [approvedStartTime, approvedEndTime] =
          reservation.rsvTime.split(" - ");

        const approvedStartDateTime = createDateTime(
          startDate,
          approvedStartTime
        );
        const approvedEndDateTime = createDateTime(
          endDate || startDate,
          approvedEndTime
        );

        const requestStartDateTime = new Date(`${startDate} ${startTimeValue}`);
        const requestEndDateTime = new Date(`${endDate} ${endTimeValue}`);

        console.log("Request Start:", requestStartDateTime);
        console.log("Request End:", requestEndDateTime);
        console.log("Approved Start:", approvedStartDateTime);
        console.log("Approved End:", approvedEndDateTime);

        return (
          requestStartDateTime < approvedEndDateTime &&
          requestEndDateTime > approvedStartDateTime
        );
      });

      if (isOverlap) {
        setAlert({
          type: "error",
          message:
            "The requested time overlaps with an already approved reservation.",
        });
        return;
      }

      // check for duplicate reservation request (userId & facilityId)
      const isDuplicate = allReservations.some(
        (reservation) =>
          reservation.userId === currentUser.id &&
          reservation.facilityId === facilityId &&
          reservation.rsvDate === rsvDate &&
          reservation.rsvTime === `${formattedStartTime} - ${formattedEndTime}`
      );

      if (isDuplicate) {
        setAlert({
          type: "error",
          message: "You already have a reservation for this time and facility.",
        });
        return;
      }

      // proceed if fresh reservation request
      const postResponse = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        throw new Error(errorData.message || "Failed to submit reservation.");
      }

      setAlert({
        type: "success",
        message: "Reservation submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setAlert({
        type: "error",
        message: "Failed to submit reservation. Please try again.",
      });
    }
  };

  const closeAlert = () => {
    setAlert(null);
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
              {isLoading ? (
                <p>Loading facilities...</p>
              ) : error ? (
                <p className="error">{error}</p>
              ) : (
                <select id="facility" name="facility">
                  <option value="">Select one</option>

                  {/* Grouping facilities by type */}
                  {facilities
                    .reduce((acc, facility) => {
                      const group = acc.find((g) => g.type === facility.type);
                      if (group) {
                        group.facilities.push(facility);
                      } else {
                        acc.push({
                          type: facility.type,
                          facilities: [facility],
                        });
                      }
                      return acc;
                    }, [])
                    .map((group) => (
                      <optgroup key={group.type} label={group.type}>
                        {group.facilities.map((facility) => (
                          <option key={facility.id} value={facility.id}>
                            {facility.title}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                </select>
              )}
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

            {/* Department Name */}
            <div className="item">
              <label htmlFor="department">Department/Organization</label>
              <select id="department" name="department">
                <option value="">Select one</option>

                {/* Academic Organizations */}
                <optgroup label="Academic Organization">
                  <option value="FAITH Computer Engineering Society">
                    FAITH Computer Engineering Society
                  </option>
                  <option value="FAITH Public Safety Society">
                    FAITH Public Safety Society
                  </option>
                  <option value="United Tourism and Hospitality Young Professionals - FAITH Chapter">
                    United Tourism and Hospitality Young Professionals - FAITH
                    Chapter
                  </option>
                  <option value="Junior Institute of Electronics Engineers of the Philippines - FAITH Chapter">
                    Junior Institute of Electronics Engineers of the Philippines
                    - FAITH Chapter
                  </option>
                  <option value="Junior Philippine Institute of Accountants - FAITH Chapter">
                    Junior Philippine Institute of Accountants - FAITH Chapter
                  </option>
                  <option value="FAITH Psychology Society">
                    FAITH Psychology Society
                  </option>
                  <option value="FAITH Computer Technology Society">
                    FAITH Computer Technology Society
                  </option>
                  <option value="Junior Philippine Institute of Industrial Engineers - FAITH Chapter">
                    Junior Philippine Institute of Industrial Engineers - FAITH
                    Chapter
                  </option>
                  <option value="FAITH Allied Health Sciences Society">
                    FAITH Allied Health Sciences Society
                  </option>
                  <option value="Junior Managers' Association of the Philippines Institute of Integrated Electrical Engineers of the Philippines - FAITH Student Chapter">
                    Junior Managers' Association of the Philippines Institute of
                    Integrated Electrical Engineers of the Philippines - FAITH
                    Student Chapter
                  </option>
                  <option value="First Asia BA Communication and Multimedia Arts Society">
                    First Asia BA Communication and Multimedia Arts Society
                  </option>
                  <option value="FAITH Teachers' League">
                    FAITH Teachers' League
                  </option>
                  <option value="FAITH Student Council">
                    FAITH Student Council
                  </option>
                </optgroup>

                {/* Non-Academic Organizations */}
                <optgroup label="Non-Academic Organization">
                  <option value="The Creative Society">
                    The Creative Society
                  </option>
                  <option value="The FAITH Colleges Instrumentalists">
                    The FAITH Colleges Instrumentalists
                  </option>
                  <option value="The FAITH Colleges Symphonic Orchestra">
                    The FAITH Colleges Symphonic Orchestra
                  </option>
                  <option value="FAITH Colleges Esports Club">
                    FAITH Colleges Esports Club
                  </option>
                </optgroup>

                {/* Departments */}
                <optgroup label="Department">
                  <option value="College of Computing and Information Technology">
                    College of Computing and Information Technology
                  </option>
                  <option value="College of Engineering">
                    College of Engineering
                  </option>
                  <option value="College of Arts & Sciences">
                    College of Arts & Sciences
                  </option>
                  <option value="College of Education">
                    College of Education
                  </option>
                  <option value="College of Allied Health Sciences">
                    College of Allied Health Sciences
                  </option>
                  <option value="College of Business and Accountancy">
                    College of Business and Accountancy
                  </option>
                  <option value="College of Tourism and Hospitality Management">
                    College of Tourism and Hospitality Management
                  </option>
                  <option value="College of Public Safety">
                    College of Public Safety
                  </option>
                </optgroup>

                {/* Others */}
                <optgroup label="Others">
                  <option value="Admissions and Testing Center">
                    Admissions and Testing Center
                  </option>
                  <option value="FAITH MIS">FAITH MIS</option>
                </optgroup>
              </select>
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
        <button type="button" className="submitButton" onClick={handleSubmit}>
          Send Reservation
        </button>
      </div>

      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
}

export default ReservationPage;
