// Sidebar.js
import React from "react";
import { calcDistance } from "../../lib/calcDistance";
import "./sidebar.scss";

const Sidebar = ({
  currentLocation,
  selectedFacility,
  onFacilityChange,
  facilities,
}) => {
  const distance = calcDistance(
    currentLocation.latitude,
    currentLocation.longitude,
    selectedFacility.latitude,
    selectedFacility.longitude
  ).toFixed(2);

  return (
    <div className="sidebar">
      <h1>Directions</h1>
      <p>
        Your Location: Latitude {currentLocation.latitude}, Longitude{" "}
        {currentLocation.longitude}
      </p>
      <select
        onChange={(e) => onFacilityChange(e.target.value)}
        value={selectedFacility?.id || ""}
      >
        {facilities.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.title}
          </option>
        ))}
      </select>
      {selectedFacility && (
        <>
          <p>Please head to Floor {selectedFacility.floor}</p>
          <p>Distance: {distance} km</p>
        </>
      )}
    </div>
  );
};

export default Sidebar;
