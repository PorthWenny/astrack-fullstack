import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import L from "leaflet";
import { useEffect } from "react";
import "./BigMap.scss";

function Routing({ currentLocation, selectedFacility }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !currentLocation || !selectedFacility) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(currentLocation.latitude, currentLocation.longitude),
        L.latLng(selectedFacility.latitude, selectedFacility.longitude),
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      createMarker: function (i, waypoint) {
        return L.marker(waypoint.latLng);
      },
      show: false,
      addWaypoints: false,
    }).addTo(map);

    // remove the routing control when the component is unmounted
    return () => map.removeControl(routingControl);
  }, [map, currentLocation, selectedFacility]);

  return null;
}

function BigMap({ currentLocation, selectedFacility }) {
  return (
    <div className="mapContainer">
      <MapContainer
        center={[currentLocation.latitude, currentLocation.longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; ASTRACK and <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing
          currentLocation={currentLocation}
          selectedFacility={selectedFacility}
        />
        <Marker
          position={[currentLocation.latitude, currentLocation.longitude]}
        />
        <Marker
          position={[selectedFacility.latitude, selectedFacility.longitude]}
        />
      </MapContainer>
    </div>
  );
}

export default BigMap;
