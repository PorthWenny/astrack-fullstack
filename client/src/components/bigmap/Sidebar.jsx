import React from "react";
import { calcDistance } from "../../lib/calcDistance";

const Sidebar = ({
  currentLocation,
  facilities,
  selectedFacility,
  handleFacilityChange,
}) => {
  return (
    <div className="sidebar">
      <h1>Directions</h1>
      <p>
        Your Location: Latitude {currentLocation.latitude}, Longitude{" "}
        {currentLocation.longitude}
      </p>
      <select
        onChange={(e) => handleFacilityChange(e.target.value)}
        value={selectedFacility.id}
      >
        {facilities.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.title}
          </option>
        ))}
      </select>
      <p>Please head to Floor {selectedFacility.floor}</p>
      <p>
        Distance:{" "}
        {calcDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          selectedFacility.latitude,
          selectedFacility.longitude
        ).toFixed(2)}{" "}
        km
      </p>
    </div>
  );
};

export default Sidebar;
