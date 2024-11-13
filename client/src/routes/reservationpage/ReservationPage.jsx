import './reservationpage.scss';

function ReservationPage() {
  return (
    <div className='ReservationPage'>
      <div className="formContainer">
        <h1>Reserve a Facility</h1>
        <div className="wrapper">
          <form>
            {/* Event Title */}
            <div className="item">
              <label htmlFor='title'>Event Title</label>
              <input id="title" name="title" type="text" placeholder="Enter event title" />
            </div>

            {/* Facility Selection */}
            <div className="item">
              <label htmlFor='facility'>Facility</label>
              <select id="facility" name="facility">
                <option value="">Select a Facility</option>
                <option value="auditorium">Auditorium</option>
                <option value="conferenceRoom">Conference Room</option>
                <option value="gym">Gym</option>
                {/* Add other facilities as options */}
              </select>
            </div>

            {/* Description */}
            <div className="item">
              <label htmlFor='description'>Description</label>
              <textarea id="description" name="description" rows="4" placeholder="Enter event description"></textarea>
            </div>

            {/* Purpose of Reservation */}
            <div className="item">
              <label htmlFor='purpose'>Purpose of Reservation</label>
              <input id="purpose" name="purpose" type="text" placeholder="Enter purpose of reservation" />
            </div>
          </form>
        </div>
      </div>

      {/* Calendar and Time Selection */}
      <div className="calendarContainer">
        <h2>Select Date and Time</h2>
        {/* Assuming you add a date-picker component here, for example */}
        <div className="calendar">
          <input type="date" id="eventDate" name="eventDate" />
        </div>
        <div className="timeSelection">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" id="startTime" name="startTime" />
          
          <label htmlFor="endTime">End Time</label>
          <input type="time" id="endTime" name="endTime" />
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;
