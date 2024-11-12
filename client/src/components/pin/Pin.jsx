import { Link } from "react-router-dom";
import "./pin.scss";
import { Marker, Popup } from "react-leaflet";

function Pin({ item }) {
  return (
    <div className="Pin">
      <Marker position={[item.latitude, item.longitude]}>
        <Popup>
          <div className="popupContainer">
            <img src={item.img} alt="" />
            <div className="textContainer">
              <Link to={`/${item.id}`}>{item.title}</Link>
              <span>Located at Floor {item.floor}</span>
              <b>Open {item.openHours}</b>
            </div>
          </div>
        </Popup>
      </Marker>
    </div>
  );
}

export default Pin;
