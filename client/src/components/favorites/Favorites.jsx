import { useEffect, useState } from "react";
import Card from "../card/Card";
import "./favorites.scss";
import apiRequest from "../../lib/apiRequest";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiRequest.get("/users/favorites",);
        setFavorites(response.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <div className="Favorites">
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <Card key={favorite.facilityId} item={favorite.facility} />
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default Favorites;
