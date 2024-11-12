import "./filter.scss";

function Filter() {
  return (
    <div className="Filter">
      <h1>
        Showing results for <b>Room 69</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="name">Facility</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Facility Name"
          />
        </div>
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="room">Room</option>
            <option value="canteen">Canteen</option>
            <option value="court">Court</option>
          </select>
        </div>
        <button>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
