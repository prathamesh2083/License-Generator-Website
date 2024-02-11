import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:4000/v1/",
});
export default API;