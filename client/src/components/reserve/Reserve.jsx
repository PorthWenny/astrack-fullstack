import "./reserve.scss";
import { facilData, reserveData, currentUser } from "../../lib/demodata";

function Reserve() {
  const userReservations = reserveData.filter(
    (reservation) => reservation.user_id === currentUser.user_id
  );

  return (
    <div className="Reserve">
      <div className="reserveList">
        <div className="wrapper">
          {userReservations.length ? (
            userReservations.map((reservation, index) => {
              const facility = facilData.find(
                (facil) => facil.id === reservation.location_id
              );

              if (!facility) {
                console.warn(
                  `No facility found for reservation ID: ${reservation.id}`
                );
                return null;
              }

              // Use a fallback for missing reservation.id
              const uniqueKey = reservation.id || `reservation-${index}`;

              return (
                <div className="reservation" key={uniqueKey}>
                  <img
                    src={facility.img || "/placeholder.png"}
                    alt={facility.title || "Unknown Facility"}
                  />
                  <div className="reservationInfo">
                    <h2>{reservation.event_name}</h2>
                    <h3>{facility.title || "Unknown Facility"}</h3>
                    <p>
                      <strong>Date:</strong> {reservation.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {reservation.startTime} -{" "}
                      {reservation.endTime}
                    </p>
                    <p>
                      <strong>Status:</strong> {reservation.progress}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reserve;
