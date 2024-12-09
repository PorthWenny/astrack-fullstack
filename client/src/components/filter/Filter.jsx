import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState({
    title: searchParams.get("title") || "",
    type: searchParams.get("type") || "",
  });

  useEffect(() => {
    // Fetch facility types
    const fetchTypes = async () => {
      try {
        const response = await fetch("/api/facilities/types");
        const data = await response.json();

        setTypes(data);
      } catch (error) {
        console.error("Error fetching facility types:", error);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(search);
  };

  return (
    <div className="Filter">
      <h1>
        Showing results for <b>{searchParams.get("title") || "All"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="name">Facility</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Facility Name"
            onChange={handleChange}
            defaultValue={search.title}
          />
        </div>
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={search.type}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
