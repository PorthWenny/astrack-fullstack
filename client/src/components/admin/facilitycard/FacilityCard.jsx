import { useNavigate } from "react-router-dom";
import "./facilitycard.scss";
import apiRequest from "../../../lib/apiRequest";

function FacilityCard({ facility, adminMode }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-facility/${facility.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility?"
    );
    if (confirmDelete) {
      try {
        await apiRequest.delete(`/facilities/${facility.id}`);
        console.log(`Deleted facility ${facility.id}`);
        navigate(0);
      } catch (error) {
        console.error("Error deleting facility:", error);
      }
    }
  };

  return (
    <div className="Card">
      <img src={facility.img || "/placeholder.png"} alt={facility.title} />
      <div className="textContainer">
        <h2>{facility.title}</h2>
        <p>{facility.location}</p>
        <p>{facility.openHours}</p>
        {adminMode && (
          <div className="adminActions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacilityCard;
