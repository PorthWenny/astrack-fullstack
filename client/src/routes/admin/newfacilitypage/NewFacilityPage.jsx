import "./newfacilitypage.scss";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useState } from "react";
import Alert from "../../../components/alert/Alert";
import Map from "../../../components/map/Map";

function NewFacilityPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(52.5027); // Default latitude
  const [longitude, setLongitude] = useState(-2.1245); // Default longitude
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [type, setType] = useState("");
  const [floor, setFloor] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [alert, setAlert] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      setAlert({
        type: "error",
        message: "You can upload up to 4 images only.",
      });
    } else {
      setImages([...e.target.files]);
    }
  };

  const updateCoordinates = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !location ||
      !latitude ||
      !longitude ||
      !description ||
      !type ||
      !floor ||
      !openHours ||
      images.length === 0
    ) {
      setAlert({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("floor", floor);
      formData.append("openHours", openHours);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch("/api/facilities", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add facility.");
      }

      setAlert({ type: "success", message: "Facility added successfully!" });
      // Reset form
      setTitle("");
      setLocation("");
      setLatitude(52.5027); // Reset to default latitude
      setLongitude(-2.1245); // Reset to default longitude
      setDescription("");
      setImages([]);
      setType("");
      setFloor("");
      setOpenHours("");
    } catch (error) {
      console.error("Error adding facility:", error);
      setAlert({
        type: "error",
        message: "Failed to add facility. Please try again.",
      });
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <div className="NewFacilityPage">
      <div className="formContainer">
        <h1>Add New Facility</h1>
        <div className="inputsContainer">
          {/* Form inputs */}
          <form>
            <div className="item">
              <label htmlFor="title">Facility Name</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter facility name"
              />
            </div>
            <div className="item">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="item">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter description"
              />
            </div>
            <div className="item">
              <label htmlFor="images">Images (max 4)</label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Classroom">Classroom</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="floor">Floor</label>
              <input
                id="floor"
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Enter floor number"
              />
            </div>
            <div className="item">
              <label htmlFor="openHours">Open Hours</label>
              <input
                id="openHours"
                type="text"
                value={openHours}
                onChange={(e) => setOpenHours(e.target.value)}
                placeholder="e.g., 8:00 AM - 6:00 PM"
              />
            </div>
          </form>
        </div>
        <div className="mapContainer">
          {/* Map container */}
          <Map
            items={[]}
            onMapClick={(lat, lng) => updateCoordinates(lat, lng)} // Listen for map clicks
          />
        </div>
        <button type="button" className="submitButton" onClick={handleSubmit}>
          Add Facility
        </button>
      </div>
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
}

export default NewFacilityPage;
