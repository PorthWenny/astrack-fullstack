import { useState, useEffect } from "react";

const useReverseGeocoding = (latitude, longitude) => {
  const [generalLocation, setGeneralLocation] = useState("Fetching...");

  useEffect(() => {
    if (latitude && longitude) {
      const fetchGeneralLocation = async () => {
        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch location");
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            setGeneralLocation(data.results[0].formatted);
          } else {
            setGeneralLocation("Unknown location");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setGeneralLocation("Error fetching location");
        }
      };

      fetchGeneralLocation();
    }
  }, [latitude, longitude]);

  return generalLocation;
};

export default useReverseGeocoding;
