import "./map.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ items, center, onMapClick }) {
  return (
    <MapContainer
      center={center}
      zoom={25}
      scrollWheelZoom={false}
      className="Map"
    >
      <TileLayer
        attribution='&copy; ASTRACK and <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
