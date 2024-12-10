import "./adminreservations.scss";
import { useState, useEffect } from "react";
import apiRequest from "../../../lib/apiRequest";

function AdminReservations({ reservations, onUpdate }) {
  const [updatedReservations, setUpdatedReservations] = useState(
    reservations || []
  );

  useEffect(() => {
    console.log("Reservations prop on mount:", reservations); // Log the reservations prop
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
    <div className="Reservations">
      {updatedReservations && updatedReservations.length > 0 ? (
        updatedReservations.map((reservation) => {
          if (!reservation) {
            console.warn("Skipping invalid reservation", reservation);
            return null;
          }

          return (
            <div key={reservation.id} className="reservation">
              <h2>{reservation.title}</h2>
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

              <button
                onClick={() => handleUpdateProgress(reservation.id, "Approved")}
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleUpdateProgress(reservation.id, "Disapproved")
                }
              >
                Disapprove
              </button>
            </div>
          );
        })
      ) : (
        <p>No reservations available</p>
      )}
    </div>
  );
}

export default AdminReservations;
