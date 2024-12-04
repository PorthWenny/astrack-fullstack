import { useState } from "react";
import "./card.scss";
import {
  isEventOngoing,
  filterPastEvents,
} from "../../components/events/Events";
import { Link } from "react-router-dom";

function Card({ item }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const ongoingEvent = isEventOngoing(item.id);
  const pastEvents = filterPastEvents(item.id);
  const mostRecentEvent = pastEvents.length > 0 ? pastEvents[0] : null;
  const eventToShow = ongoingEvent || mostRecentEvent;

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const dropdownText = ongoingEvent
    ? "Show Ongoing Event"
    : "Show Most Recent Event";

  return (
    <div className="Card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.img} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="location">
          <img src="/pin.png" alt="Location pin" />
          <span>{item.location}</span>
        </p>
        <p className="openhours">Open {item.openHours}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/room.png" alt="Room icon" />
              <span>{item.type}</span>
            </div>
            <div className="feature">
              <img src="/stair.png" alt="Stair icon" />
              <span>Floor {item.floor}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save icon" />
            </div>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <span>{dropdownText}</span>
            </button>
          </div>
        </div>
      </div>
      {showDropdown && eventToShow && (
        <div className="dropdown">
          <h3>{eventToShow.title}</h3>
          <p className="date-time">
            {eventToShow.date} | {eventToShow.time}
          </p>
          <p>{eventToShow.description}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
