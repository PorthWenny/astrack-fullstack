import "./adminreservations.scss";
import { useState, useEffect } from "react";
import apiRequest from "../../../lib/apiRequest";

function AdminReservations({ reservations, onUpdate }) {
  const [updatedReservations, setUpdatedReservations] = useState(
    reservations || []
  );

  useEffect(() => {
    setUpdatedReservations(reservations);
  }, [reservations]);

  const handleUpdateProgress = async (id, status) => {
    try {
      const res = await apiRequest.put(`/reservations/${id}`, {
        progress: status,
      });

      console.log("Updated reservation response:", res.data);

      if (res && res.data) {
        setUpdatedReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === id
              ? { ...reservation, progress: status, ...res.data }
              : reservation
          )
        );
        onUpdate(res.data);
      }
    } catch (error) {
      console.error(
        "Error updating reservation:",
        error.response || error.message
      );
    }
  };

  return (
    <div className="AdminReservation">
      <div className="reservationList">
        <div className="wrapper">
          {updatedReservations && updatedReservations.length > 0 ? (
            updatedReservations.map((reservation) => {
              if (!reservation) {
                console.warn("Skipping invalid reservation", reservation);
                return null;
              }

              // Determine the class based on the reservation's progress (status)
              const statusClass =
                reservation.progress === "Approved"
                  ? "approved"
                  : reservation.progress === "Disapproved"
                  ? "disapproved"
                  : "";

              return (
                <div
                  key={reservation.id}
                  className={`reservation ${statusClass}`}
                >
                  <img
                    src={reservation.facility?.img || "/placeholder.png"}
                    alt={reservation.facility?.title || "Facility Image"}
                  />
                  <div className="reservationInfo">
                    <h2>{reservation.title}</h2>
                    <h3>{reservation.facility?.title || "No Facility"}</h3>
                    <p>Department: {reservation.department}</p>
                    <p>
                      Facility: {reservation.facility?.title} (
                      {reservation.facility?.location})
                    </p>
                    <p>Date: {reservation.rsvDate}</p>
                    <p>Time: {reservation.rsvTime}</p>
                    <p>Status: {reservation.progress}</p>
                    <p>
                      Reserved by: {reservation.user?.username} (
                      {reservation.user?.email})
                    </p>
                    <div className="actionButtons">
                      <button
                        className="approve"
                        onClick={() =>
                          handleUpdateProgress(reservation.id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="disapprove"
                        onClick={() =>
                          handleUpdateProgress(reservation.id, "Disapproved")
                        }
                      >
                        Disapprove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No reservations available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;
