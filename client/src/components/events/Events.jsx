import "./events.scss";
import { eventsData } from "../../lib/demodata";

export function isEventOngoing(locationId) {
  const now = new Date();
  return eventsData.some((event) => {
    if (event.location_id !== locationId) return false;

    const eventDate = new Date(event.date);
    const [startTime, endTime] = event.time.split(" - ").map((time) => {
      const dateWithTime = `${event.date} ${time}`;
      return new Date(dateWithTime);
    });

    const isSameDay = now.toDateString() === eventDate.toDateString();
    return isSameDay && now >= startTime && now <= endTime;
  });
}

export function filterPastEvents(locationId) {
  const now = new Date();
  return eventsData
    .filter((event) => {
      if (event.location_id !== locationId) return false;

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

function Events({ locationId }) {
  const filteredEvents = filterPastEvents(locationId);

  return (
    <div className="Events">
      {filteredEvents.map((event) => (
        <div key={event.id} className="event-card">
          <img src={event.img} alt={event.title} />
          <div className="event-info">
            <h3>{event.title}</h3>
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
