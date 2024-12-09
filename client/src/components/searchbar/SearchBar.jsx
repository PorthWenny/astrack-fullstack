import React, { useState } from "react";
import "./searchbar.scss";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Search for a facility"
          onChange={handleChange}
        />
        <Link to={`/facilities?title=${search.title}`}>
          <button type="submit">
            <img src="/search.png" alt="Search Icon" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
