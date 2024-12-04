import { useState, useEffect } from "react";
import Sidebar from "../../components/bigmap/Sidebar";
import BigMap from "../../components/bigmap/BigMap";
import { facilData } from "../../lib/demodata";
import "./directions.scss";

function Directions() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(facilData[0]);

  useEffect(() => {
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
    const facility = facilData.find((fac) => fac.id === Number(facilityId));
    setSelectedFacility(facility);
  };

  if (!currentLocation) return <div>Loading map...</div>;

  return (
    <div className="Directions">
      <Sidebar
        currentLocation={currentLocation}
        selectedFacility={selectedFacility}
        onFacilityChange={handleFacilityChange}
      />
      <BigMap
        currentLocation={currentLocation}
        selectedFacility={selectedFacility}
      />
    </div>
  );
}

export default Directions;
