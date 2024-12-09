import Slider from "../../components/slider/Slider";
import "./singlepage.scss";
import Map from "../../components/map/Map";
import Events, { isEventOngoing } from "../../components/events/Events";
import { Link, useLoaderData } from "react-router-dom";

function SinglePage() {
  const currentFacility = useLoaderData();
  const ongoingEvent = isEventOngoing(currentFacility.id);
  console.log(currentFacility);

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
            <div className="bottom">{currentFacility.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Events Held</p>
          <div className="listVertical">
            <Events locationId={currentFacility.id} />
          </div>
          <p className="title">Information</p>
          <div className="infos">
            <div className="info">
              <img src="/stair.png" alt="" />
              <span>{currentFacility.floor} Floor/s</span>
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
            <button>
              <img src="/save.png" alt="" />
              Save as Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
