import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/facilities/" + params.id);
  return res.data;
};

export const facilityDataLoader = async () => {
  try {
    const response = await fetch("/api/facilities");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching facility data:", error);
    return [];
  }
};
