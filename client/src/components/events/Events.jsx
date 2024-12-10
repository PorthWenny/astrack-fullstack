import "./events.scss";
import { eventsData } from "../../lib/demodata";

export function isEventOngoing(facilityId) {
  const now = new Date();
  return eventsData.some((event) => {
    if (event.facilityId !== facilityId) return false;

    const eventDate = new Date(event.date);
    const [startTime, endTime] = event.time.split(" - ").map((time) => {
      const dateWithTime = `${event.date} ${time}`;
      return new Date(dateWithTime);
    });

    const isSameDay = now.toDateString() === eventDate.toDateString();
    return isSameDay && now >= startTime && now <= endTime;
  });
}

export function filterPastEvents(facilityId) {
  const now = new Date();
  return eventsData
    .filter((event) => {
      if (event.facilityId !== facilityId) return false;

      const [startTime, endTime] = event.time.split(" - ").map((time) => {
        // Convert 12-hour format to 24-hour format
        const dateWithTime = `${event.date} ${time}`;
        return new Date(dateWithTime);
      });

      return now > endTime;
    })
    .sort((a, b) => {
      const [aStartTime, aEndTime] = a.time.split(" - ").map((time) => {
        const dateWithTime = `${a.date} ${time}`;
        return new Date(dateWithTime);
      });
      const [bStartTime, bEndTime] = b.time.split(" - ").map((time) => {
        const dateWithTime = `${b.date} ${time}`;
        return new Date(dateWithTime);
      });
      return bEndTime - aEndTime;
    });
}

function Events({ facilityId }) {
  const filteredEvents = filterPastEvents(facilityId);

  return (
    <div className="Events">
      {filteredEvents.map((event) => (
        <div key={event.id} className="event-card">
          <img src={event.img} alt={event.purpose} />
          <div className="event-info">
            <h3>{event.purpose}</h3>
            <p className="date-time">
              {event.date} | {event.time}
            </p>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Events;
