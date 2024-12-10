import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "./bigmap.scss";

const BigMap = ({ currentLocation, selectedFacility }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
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

    if (mapInstance.current && selectedFacility) {
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.latitude, currentLocation.longitude),
          L.latLng(selectedFacility.latitude, selectedFacility.longitude),
        ],
        routeWhileDragging: true,
      }).addTo(mapInstance.current);

      return () => {
        routeControl.getPlan().setWaypoints([]);
      };
    }
  }, [currentLocation, selectedFacility]);

  return <div id="map" ref={mapRef} style={{ height: "100vh" }} />;
};

export default BigMap;
