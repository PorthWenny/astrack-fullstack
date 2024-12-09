// BigMap.js
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "./bigmap.scss";

const BigMap = ({ currentLocation, selectedFacility }) => {
  const mapRef = useRef(null); // Reference for the map container
  const mapInstance = useRef(null); // Store the map instance to avoid re-initializing

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized yet
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [currentLocation.latitude, currentLocation.longitude],
        zoom: 16,
      });

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapInstance.current
      );
    }

    // Update the map's position and routing if the selected facility changes
    if (mapInstance.current && selectedFacility) {
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.latitude, currentLocation.longitude),
          L.latLng(selectedFacility.latitude, selectedFacility.longitude),
        ],
        routeWhileDragging: true,
      }).addTo(mapInstance.current);

      // Cleanup any old route layers when the facility changes
      return () => {
        routeControl.getPlan().setWaypoints([]);
      };
    }
  }, [currentLocation, selectedFacility]); // Re-run only if currentLocation or selectedFacility changes

  return <div id="map" ref={mapRef} style={{ height: "100vh" }} />;
};

export default BigMap;
