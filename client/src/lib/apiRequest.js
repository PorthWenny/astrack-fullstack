import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:6969/api",
  withCredentials: true,
});

export default apiRequest;
