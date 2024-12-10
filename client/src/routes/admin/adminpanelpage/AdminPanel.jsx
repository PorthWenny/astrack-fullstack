import { Link, useNavigate } from "react-router-dom";
import FacilityCard from "../../../components/admin/facilitycard/FacilityCard";
import AdminReservations from "../../../components/admin/adminreservations/AdminReservations";
import apiRequest from "../../../lib/apiRequest";
import "./adminpanel.scss";
import { AuthContext } from "../../../context/authContext";
import { useContext, useEffect, useState } from "react";

function AdminPanel() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [facilities, setFacilities] = useState([]);
  const [reservations, setReservations] = useState([]);
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

  const fetchFacilities = async () => {
    try {
      const res = await apiRequest.get("/facilities");
      setFacilities(res.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await apiRequest.get("/reservations");
      console.log("Reservations:", res.data);
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchFacilities();
    fetchReservations();
  }, []);

  return (
    <div className="AdminPanel">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Admin Information</h1>
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
            <h1>Manage Facilities</h1>
            <Link to="/add-facility">
              <button>Add Facility</button>
            </Link>
          </div>
          <div className="facilityContainer">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                adminMode={true}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="reserveContainer">
        <div className="wrapper">
          <h1>Manage Reservations</h1>
          <AdminReservations
            reservations={reservations}
            onUpdate={(updatedRes) => {
              setReservations((prev) =>
                prev.map((res) => (res.id === updatedRes.id ? updatedRes : res))
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
