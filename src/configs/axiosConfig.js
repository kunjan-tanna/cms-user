import axios from "axios";
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8000/api/",
});

export default axiosInstance;
