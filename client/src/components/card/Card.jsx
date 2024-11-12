import "./card.scss";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="Card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="location">
          <img src="/pin.png" alt="" />
          <span>{item.location}</span>
        </p>
        <p className="openhours">Open {item.openHours}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/room.png" alt="" />
              <span>{item.type}</span>
            </div>
            <div className="feature">
              <img src="/stair.png" alt="" />
              <span>Floor {item.floor}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
