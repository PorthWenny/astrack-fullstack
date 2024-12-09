import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const error = () => {
      alert("Unable to fetch your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return location;
};

export default useGeolocation;
