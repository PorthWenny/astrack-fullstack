import React from "react";
import { calcDistance } from "../../lib/calcDistance";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import useReverseGeocoding from "../../hooks/useReverseGeocoding";
import { getOrdinal } from "../../lib/getOrdinal";
const Sidebar = ({
  currentLocation,
  facilities,
  selectedFacility,
  handleFacilityChange,
}) => {
  const generalLocation = useReverseGeocoding(
    currentLocation.latitude,
    currentLocation.longitude
  );

  return (
    <div className="sidebar">
      <h1>Directions</h1>
      <p>
        <span>General Location:</span> <br />
        {generalLocation}
      </p>
      <p>
        <span>Coordinates:</span> <br />
        Latitude {currentLocation.latitude}, Longitude{" "}
        {currentLocation.longitude}
      </p>
      <label htmlFor="facility-select">
        <strong>Select a Facility:</strong>
      </label>
      <select
        id="facility-select"
        onChange={(e) => handleFacilityChange(e.target.value)}
        value={selectedFacility.id}
      >
        {facilities.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.title}
          </option>
        ))}
      </select>
      <Link to={`/${selectedFacility.id}`}>
        <button>More Details</button>
      </Link>
      <p>
        <span>Destination:</span> Please head to{" "}
        <strong>{getOrdinal(selectedFacility.floor)} Floor</strong>
      </p>
      <p>
        <span>Distance:</span>{" "}
        {calcDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          selectedFacility.latitude,
          selectedFacility.longitude
        ).toFixed(2)}{" "}
        km
      </p>
      <img src="/point_tinman.png" alt="Tin Man" />
    </div>
  );
};

export default Sidebar;
