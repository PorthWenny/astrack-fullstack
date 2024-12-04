import "./sidebar.scss";
import { facilData } from "../../lib/demodata";

function Sidebar({ currentLocation, selectedFacility, onFacilityChange }) {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distance = calculateDistance(
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
      <select onChange={(e) => onFacilityChange(e.target.value)}>
        {facilData.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.title}
          </option>
        ))}
      </select>
      <p>Selected Facility: {selectedFacility.title}</p>
      <p>Distance: {distance} km</p>
    </div>
  );
}

export default Sidebar;
