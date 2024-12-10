import React, { useState, useEffect } from "react";
import UploadWidget from "../../../components/uploadWidget/UploadWidget";
import SelectLocationMap from "../../../components/map/SelectLocationMap";
import "./newFacilityPage.scss";

function NewFacilityPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(14.077915);
  const [longitude, setLongitude] = useState(121.149679);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [floor, setFloor] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [owner, setOwner] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Handle image upload to set the image URLs
  const handleImageUpload = (uploadedImages) => {
    setImages(uploadedImages);
    setImageUrls(uploadedImages.map((image) => URL.createObjectURL(image)));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("floor", floor);
    formData.append("openHours", openHours);
    formData.append("ownerId", owner);

    images.forEach((image) => formData.append("img", image));

    // Send formData to your API for facility creation (adjust API endpoint)
    fetch("/api/facilities", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Facility added successfully!");
          // Reset the form after submission
          resetForm();
        } else {
          alert("Error adding facility.");
        }
      })
      .catch((error) => alert("Error submitting form: " + error));
  };

  // Reset the form
  const resetForm = () => {
    setTitle("");
    setLocation("");
    setLatitude(0);
    setLongitude(0);
    setDescription("");
    setType("");
    setFloor("");
    setOpenHours("");
    setOwner("");
    setImages([]);
    setImageUrls([]);
  };

  return (
    <div className="new-facility-page">
      <h1>Add New Facility</h1>
      <form onSubmit={handleSubmit} className="facility-form">
        <div className="form-group">
          <label htmlFor="title">Facility Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <input
            type="text"
            id="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="openHours">Open Hours</label>
          <input
            type="text"
            id="openHours"
            value={openHours}
            onChange={(e) => setOpenHours(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owner ID</label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Facility Images (max 4)</label>
          <UploadWidget
            uwConfig={{
              cloudName: "your-cloud-name",
              uploadPreset: "your-upload-preset",
            }}
            setAvatar={handleImageUpload}
            setState={setImageUrls}
          />
          <div className="image-previews">
            {imageUrls.length > 0 &&
              imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Preview ${index + 1}`} />
              ))}
          </div>
        </div>

        {/* Location Selection Map */}
        <div className="form-group">
          <label>Location on Map</label>
          <SelectLocationMap
            initialPosition={[latitude, longitude]}
            onLocationSelect={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Add Facility
        </button>
      </form>
    </div>
  );
}

export default NewFacilityPage;
