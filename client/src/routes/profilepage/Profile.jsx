import { Link, useNavigate } from "react-router-dom";
import Favorites from "../../components/favorites/Favorites";
import Reserve from "../../components/reserve/Reserve";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

function Profile() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.png"} alt="_" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              Email: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>Favorites</h1>
            <button>Add Favorites</button>
          </div>
          <Favorites />
        </div>
      </div>
      <div className="reserveContainer">
        <div className="wrapper">
          <h1>Your Reservations</h1>
          <Link to="/reserve">
          <button>Create New</button>
          </Link>
          <Reserve />
        </div>
      </div>
    </div>
  );
}

export default Profile;
