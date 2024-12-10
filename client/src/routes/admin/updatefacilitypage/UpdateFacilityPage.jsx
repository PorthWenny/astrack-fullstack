import { useState, useEffect } from "react";
import "./updatefacilitypage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../../lib/apiRequest";
import UploadWidget from "../../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams } from "react-router-dom";

function UpdateFacilityPage() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await apiRequest.get(`facilities/${id}`);
        setFacility(res.data);
        setDescription(res.data.description || "");
        setImages(res.data.img || []);
      } catch (err) {
        console.error("Failed to fetch facility:", err);
        setError("Failed to load facility details.");
      }
    };
    fetchFacility();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/facilities/${id}`, {
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

      navigate(`/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update facility. Please try again.");
    }
  };

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div className="updateFacilityPage">
      <div className="formContainer">
        <h1>Update Facility</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={facility.title}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={facility.location}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                defaultValue={facility.latitude}
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
                defaultValue={facility.longitude}
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
              <select
                id="type"
                name="type"
                defaultValue={facility.type}
                required
              >
                <option value="Conference">Conference Room</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Classroom">Classroom</option>
                <option value="Lobby">Lobby</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="floor">Floor</label>
              <input
                id="floor"
                name="floor"
                type="number"
                defaultValue={facility.floor}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="openHours">Open Hours</label>
              <input
                id="openHours"
                name="openHours"
                type="text"
                placeholder="e.g. 8:00 AM - 5:00 PM"
                defaultValue={facility.openHours}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="ownerId">Owner</label>
              <select
                id="ownerId"
                name="ownerId"
                defaultValue={facility.owner.id}
                required
              >
                <option value="6755955644b73156759baa7a">FAITH Colleges</option>
                <option value="6755955644b73156759baa7c">
                  Fidelis Senior High
                </option>
                <option value="6755955644b73156759baa7b">
                  FAITH Catholic School
                </option>
              </select>
            </div>

            <button className="sendButton">Update Facility</button>
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

export default UpdateFacilityPage;
