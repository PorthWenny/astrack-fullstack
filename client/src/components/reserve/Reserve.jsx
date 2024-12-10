import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { userReservationsLoader } from "../../lib/loaders";
import "./reserve.scss";

function Reserve() {
  const { currentUser } = useContext(AuthContext);
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const data = await userReservationsLoader({
          params: { id: currentUser.id },
        });
        setUserReservations(data);
      } catch (error) {
        console.error("Error fetching user reservations:", error);
      }
    };

    if (currentUser?.id) {
      fetchUserReservations();
    }
  }, [currentUser]);

  return (
    <div className="Reserve">
      <div className="reserveList">
        <div className="wrapper">
          {userReservations.length ? (
            userReservations.map((reservation, index) => {
              const facility = reservation.facility;

              if (!facility) {
                console.warn(
                  `No facility found for reservation ID: ${reservation.id}`
                );
                return null;
              }

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
                      <strong>Date:</strong> {reservation.rsvDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {reservation.rsvTime}
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
