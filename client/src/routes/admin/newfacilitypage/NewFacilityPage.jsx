import { useState } from "react";
import "./newFacilityPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../../lib/apiRequest";
import UploadWidget from "../../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewFacilityPage() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/facilities", {
        title: inputs.title,
        location: inputs.location,
        latitude: parseFloat(inputs.latitude),
        longitude: parseFloat(inputs.longitude),
        description: description,
        img: images,
        type: inputs.type,
        floor: parseInt(inputs.floor),
        openHours: inputs.openHours,
        ownerId: inputs.ownerId,
      });

      navigate("/" + res.data.id);
    } catch (err) {
      console.error(err);
      setError("Failed to add facility. Please try again.");
    }
  };

  return (
    <div className="newFacilityPage">
      <div className="formContainer">
        <h1>Add New Facility</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                required
              />
            </div>
            <div className="item description">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                onChange={setDescription}
                value={description}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select id="type" name="type" required>
                <option value="Conference">Conference Room</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Classroom">Classroom</option>
                <option value="Lobby">Lobby</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="floor">Floor</label>
              <input id="floor" name="floor" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="openHours">Open Hours</label>
              <input
                id="openHours"
                name="openHours"
                type="text"
                placeholder="e.g. 8:00 AM - 5:00 PM"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="ownerId">Owner</label>
              <select id="ownerId" name="ownerId" required>
                <option value="6755955644b73156759baa7a">FAITH Colleges</option>
                <option value="6755955644b73156759baa7c">
                  Fidelis Senior High
                </option>
                <option value="6755955644b73156759baa7b">
                  FAITH Catholic School
                </option>
              </select>
            </div>

            <button className="sendButton">Add Facility</button>
            {error && <span className="errorMessage">{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt={`Facility Preview ${index + 1}`} />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dxgsvbjwo",
            uploadPreset: "facilityPictures",
            folder: "facilities",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewFacilityPage;
