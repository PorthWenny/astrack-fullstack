import Slider from "../../components/slider/Slider";
import "./singlepage.scss";
import Map from "../../components/map/Map";
import Events, { isEventOngoing } from "../../components/events/Events";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import { getOrdinal } from "../../lib/getOrdinal";

function SinglePage() {
  const currentFacility = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const ongoingEvent = isEventOngoing(currentFacility.id);
  const navigate = useNavigate();

  console.log(currentFacility);
  // Initialize favorite state from localStorage or currentFacility.isFavorite
  const [favorite, setFavorite] = useState(() => {
    const savedFavorite = localStorage.getItem(
      `favorite-${currentFacility.id}`
    );
    return savedFavorite
      ? JSON.parse(savedFavorite)
      : currentFacility.isFavorite;
  });

  const handleSave = async () => {
    setFavorite((prev) => {
      const newState = !prev;
      // Save to localStorage
      localStorage.setItem(
        `favorite-${currentFacility.id}`,
        JSON.stringify(newState)
      );
      return newState;
    });

    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.post("/users/save", { facilityId: currentFacility.id });
    } catch (err) {
      console.log(err);
      setFavorite((prev) => !prev); // Revert in case of error
    }
  };

  const center = [currentFacility.latitude, currentFacility.longitude];

  return (
    <div className="SinglePage">
      <div className="details">
        <div className="wrapper">
          <Slider img={currentFacility.img} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{currentFacility.title}</h1>
                <div className="location">
                  <img src="/pin.png" alt="" />
                  <span>{currentFacility.location}</span>
                </div>
                <div className="openhours">
                  Open {currentFacility.openHours}
                </div>
              </div>
              <div className="owner">
                <img src={currentFacility.owner.image} alt="" />
                <span>{currentFacility.owner.name}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(currentFacility.description),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Events Held</p>
          <div className="listVertical">
            <Events facilityId={currentFacility.id} />
          </div>
          <p className="title">Information</p>
          <div className="infos">
            <div className="info">
              <img src="/stair.png" alt="" />
              <span>{getOrdinal(currentFacility.floor)} Floor</span>
            </div>
            <div className="info">
              <img src="/room.png" alt="" />
              <span>{currentFacility.type}</span>
            </div>

            <div className={`info ${ongoingEvent ? "ongoing" : "available"}`}>
              <img
                src={ongoingEvent ? "/hold.png" : "/check.png"}
                alt={ongoingEvent ? "Event Ongoing" : "Available"}
              />
              <span>{ongoingEvent ? "Event Ongoing" : "Available"}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/canteen.png" alt="" />
              <div className="featureText">
                <span>Canteen</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restroom.png" alt="" />
              <div className="featureText">
                <span>Restroom</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/lobby.png" alt="" />
              <div className="featureText">
                <span>Lobby</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            {/* Pass the current location's latitude and longitude to Map */}
            <Map items={[currentFacility]} center={center} />
          </div>
          <div className="buttons">
            <Link to="/reserve">
              <button>
                <img src="/reserve.png" alt="" />
                Reserve Facility
              </button>
            </Link>
            <button
              onClick={handleSave}
              style={{ backgroundColor: favorite ? "#cacfffa4" : "white" }}
            >
              <img src="/save.png" alt="" />
              {favorite ? "Facility saved" : "Save as Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
