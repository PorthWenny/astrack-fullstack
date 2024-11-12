import React, { useState } from "react";
import "./searchbar.scss";

function SearchBar() {
  const [search, setSearch] = useState({
    location: "",
  });

  return (
    <div className="SearchBar">
      <form>
        <input
          type="text"
          name="location"
          placeholder="Search for a facility"
        />
        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
