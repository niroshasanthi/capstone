import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api/child-dashboard", // backend URL
  auth: {
    username: "parentUser", // must match your Spring Security in-memory user
    password: "password",
  },
});

export default API;
