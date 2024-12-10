import "./facilitycard.scss";

function FacilityCard({ facility, adminMode }) {
  const handleEdit = () => {
    // Navigate to edit facility page
    console.log(`Edit facility ${facility.id}`);
  };

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/facilities/${facility.id}`);
      console.log(`Deleted facility ${facility.id}`);
    } catch (error) {
      console.error("Error deleting facility:", error);
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
