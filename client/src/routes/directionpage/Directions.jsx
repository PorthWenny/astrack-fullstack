import "./directions.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/bigmap/Sidebar";
import BigMap from "../../components/bigmap/BigMap";
import { facilityDataLoader } from "../../lib/loaders";
import useGeolocation from "../../hooks/useGeolocation";

const Directions = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentLocation = useGeolocation();

  // Fetch facilities and current location on component mount
  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      const data = await facilityDataLoader();
      setFacilities(data);

      // if null, auto 0
      if (data.length > 0 && !selectedFacility) {
        setSelectedFacility(data[0]);
      }

      setLoading(false);
    };

    fetchFacilities();
  }, []);

  // Handle facility change (when a new facility is selected from dropdown)
  const handleFacilityChange = (facilityId) => {
    const facility = facilities.find((fac) => fac.id === facilityId);
    if (facility && facility !== selectedFacility) {
      setSelectedFacility(facility); // Only update if the facility is different
    }
  };

  // Show loading state if still fetching data or missing essential data
  if (loading || !currentLocation || !selectedFacility) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="Directions">
      {/* Sidebar component */}
      <Sidebar
        currentLocation={currentLocation}
        facilities={facilities}
        selectedFacility={selectedFacility}
        handleFacilityChange={handleFacilityChange}
      />

      {/* BigMap component */}
      <BigMap
        currentLocation={currentLocation}
        selectedFacility={selectedFacility}
      />
    </div>
  );
};

export default Directions;
