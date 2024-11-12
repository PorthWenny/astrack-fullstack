import "./map.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "../pin/Pin";

function Map({ items }) {
  return (
    <MapContainer
      center={[52.5027, -2.1245]}
      zoom={7}
      scrollWheelZoom={false}
      className="Map"
    >
      <TileLayer
        attribution='&copy; ASTRACK and <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
