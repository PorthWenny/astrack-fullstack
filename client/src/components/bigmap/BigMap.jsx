import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "./bigmap.scss";

const BigMap = ({ currentLocation, selectedFacility }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routeControlRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize the map
      mapInstance.current = L.map(mapRef.current, {
        center: [currentLocation.latitude, currentLocation.longitude],
        zoom: 16,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; ASTRACK and <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(mapInstance.current);

      // Add current location marker
      const currentLocationIcon = L.icon({
        iconUrl: "/map_pin.png",
        iconSize: [30, 40],
        iconAnchor: [15, 40],
      });

      L.marker([currentLocation.latitude, currentLocation.longitude], {
        icon: currentLocationIcon,
      }).addTo(mapInstance.current);
    }

    if (mapInstance.current && selectedFacility) {
      if (routeControlRef.current) {
        mapInstance.current.removeControl(routeControlRef.current);
      }

      routeControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.latitude, currentLocation.longitude),
          L.latLng(selectedFacility.latitude, selectedFacility.longitude),
        ],
        routeWhileDragging: true,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 6 }],
        },
        createMarker: (i, waypoint) => {
          const icons = [
            L.icon({
              iconUrl: "/map_pin.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
            L.icon({
              iconUrl: "/map_pin.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          ];
          return L.marker(waypoint.latLng, { icon: icons[i] });
        },
      }).addTo(mapInstance.current);

      // Fit map to route bounds
      routeControlRef.current.on("routesfound", (e) => {
        const bounds = L.latLngBounds(e.routes[0].coordinates);
        mapInstance.current.fitBounds(bounds);
      });
    }
  }, [currentLocation, selectedFacility]);

  return (
    <div className="mapContainer">
      <div id="map" ref={mapRef} style={{ height: "100%" }} />
    </div>
  );
};

export default BigMap;
