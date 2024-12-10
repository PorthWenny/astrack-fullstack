import { useState, useContext } from "react";
import "./card.scss";
import {
  isEventOngoing,
  filterPastEvents,
} from "../../components/events/Events";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/authContext";

function Card({ item }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [favorite, setFavorite] = useState(() => {
    // Initialize favorite state from localStorage or item.isFavorite
    const savedFavorite = localStorage.getItem(`favorite-${item.id}`);
    return savedFavorite ? JSON.parse(savedFavorite) : item.isFavorite;
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const ongoingEvent = isEventOngoing(item.id);
  const pastEvents = filterPastEvents(item.id);
  const mostRecentEvent = pastEvents.length > 0 ? pastEvents[0] : null;
  const eventToShow = ongoingEvent || mostRecentEvent || null;

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const dropdownText = !eventToShow
    ? "No events available"
    : showDropdown
    ? "<"
    : ongoingEvent
    ? "Show Ongoing Event"
    : "Show Most Recent Event";

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.post("/users/save", { facilityId: item.id });

      setFavorite((prev) => {
        const newState = !prev;
        localStorage.setItem(`favorite-${item.id}`, JSON.stringify(newState)); // Save to localStorage
        return newState;
      });
    } catch (err) {
      console.error("Error saving favorite:", err);
    }
  };

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
            <div
              className="icon"
              style={{
                "background-color": favorite ? "#cacfffa4" : "white",
              }}
            >
              {/* Save button with conditional styling */}
              <img onClick={handleSave} src="/save.png" alt="Save icon" />
            </div>
            {/* Dropdown button for showing events */}
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <span>{dropdownText}</span>
            </button>
          </div>
        </div>
      </div>
      {showDropdown && eventToShow && (
        <div className="dropdown">
          <h3>{eventToShow.purpose}</h3>
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
