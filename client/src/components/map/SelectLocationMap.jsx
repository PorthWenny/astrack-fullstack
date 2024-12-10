import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";

const SelectLocationMap = ({ initialPosition, onLocationSelect }) => {
  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    onLocationSelect(lat, lng);
  };

  return (
    <MapContainer
      center={initialPosition}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
      onClick={handleClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={initialPosition}>
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SelectLocationMap;
