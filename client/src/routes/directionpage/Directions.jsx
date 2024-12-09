import { useState, useEffect } from "react";
import BigMap from "../../components/bigmap/BigMap";
import { facilityDataLoader } from "../../lib/loaders";
import "./directions.scss";
import { calcDistance } from "../../lib/calcDistance";

function Directions() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all facilities when the component mounts
    const fetchFacilities = async () => {
      setLoading(true);
      const data = await facilityDataLoader();
      setFacilities(data);
      setSelectedFacility(data[0]);
      setLoading(false);
    };

    fetchFacilities();

    // Fetch current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => alert("Unable to fetch your location")
    );
  }, []);

  const handleFacilityChange = (facilityId) => {
    const facility = facilities.find((fac) => fac.id === Number(facilityId));
    setSelectedFacility(facility); // Update selected facility
  };

  console.log(currentLocation, selectedFacility);

  // If loading or missing data, show loading message
  if (loading || !currentLocation || !selectedFacility) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="Directions">
      {/* Sidebar with inline control */}
      <div className="sidebar">
        <h1>Directions</h1>
        <p>
          Your Location: Latitude {currentLocation.latitude}, Longitude{" "}
          {currentLocation.longitude}
        </p>
        <select onChange={(e) => handleFacilityChange(e.target.value)}>
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

      {/* BigMap component */}
      <BigMap
        currentLocation={currentLocation}
        selectedFacility={selectedFacility}
      />
    </div>
  );
}

export default Directions;
