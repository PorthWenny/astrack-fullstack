import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/facilities/" + params.id);
  return res.data;
};

export const userReservationsLoader = async ({ params }) => {
  try {
    const res = await apiRequest("/reservations?userId=" + params.id);
    return res.data;
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    return [];
  }
};

export const facilityPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/facilities?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const facilityTypesLoader = async () => {
  try {
    const response = await fetch("/facilities/types");
    const types = await response.json();
    return types;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
};

export const facilityDataLoader = async () => {
  try {
    const response = await fetch("/api/facilities");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching facility data:", error);
    return [];
  }
};
