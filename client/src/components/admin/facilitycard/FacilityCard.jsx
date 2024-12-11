import { useNavigate } from "react-router-dom";
import "./facilitycard.scss";
import apiRequest from "../../../lib/apiRequest";
import { getOrdinal } from "../../../lib/getOrdinal";

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
    <div className="FacilityCard">
      <div className="imgContainer">
        <img src={facility.img || "/placeholder.png"} alt={facility.title} />
      </div>
      <div className="textContainer">
        <h2 className="title">{facility.title}</h2>
        <p className="location">{facility.location}</p>
        <p className="openhours">{facility.openHours}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              {/* Type */}
              <span>{facility.type}</span>
            </div>
            <div className="feature">
              {/* Floor */}
              <span>at {getOrdinal(facility.floor)} floor </span>
            </div>
          </div>
          {adminMode && (
            <div className="icons">
              <div className="icon-edit" onClick={handleEdit}>
                <img src="/edit.png" alt="Edit" />
              </div>
              <div className="icon-del" onClick={handleDelete}>
                <img src="/delete.png" alt="Delete" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
