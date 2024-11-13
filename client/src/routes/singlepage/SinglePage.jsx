import Slider from "../../components/slider/Slider";
import "./singlepage.scss";
import { ownerData, singlePostData, eventsData } from "../../lib/demodata";
import Map from "../../components/map/Map";
import Events, { isEventOngoing } from "../../components/events/Events";
import { Link } from "react-router-dom";

function SinglePage() {
  const ongoingEvent = isEventOngoing(singlePostData.id);

  return (
    <div className="SinglePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="location">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.location}</span>
                </div>
                <div className="openhours">Open {singlePostData.openHours}</div>
              </div>
              <div className="owner">
                <img src={ownerData.img} alt="" />
                <span>{ownerData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Events Held</p>
          <div className="listVertical">
            <Events locationId={singlePostData.id} />
          </div>
          <p className="title">Information</p>
          <div className="infos">
            <div className="info">
              <img src="/stair.png" alt="" />
              <span>{singlePostData.floor} Floor/s</span>
            </div>
            <div className="info">
              <img src="/room.png" alt="" />
              <span>{singlePostData.type}</span>
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
            <Map items={[singlePostData]} />
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
