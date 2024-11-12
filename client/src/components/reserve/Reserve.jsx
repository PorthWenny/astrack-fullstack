import "./reserve.scss";
import { facilData, reserveData, currentUser } from "../../lib/demodata";

function Reserve() {
  // Filter reservations to show only those for the logged-in user
  const userReservations = reserveData.filter(
    (reservation) => reservation.user_id === currentUser.user_id
  );

  return (
    <div className="Reserve">
      <div className="reserveList">
        <div className="wrapper">
          {userReservations.length ? (
            userReservations.map((reservation) => {
              const facility = facilData.find(
                (facil) => facil.id === reservation.location_id
              );
              return (
                <div className="reservation" key={reservation.id}>
                  <img src={facility.img} alt={facility.title} />
                  <div className="reservationInfo">
                    <h2>{reservation.event_name}</h2>
                    <h3>{facility.title}</h3>
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
