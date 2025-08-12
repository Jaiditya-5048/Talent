
import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  withCredentials: true
});
api.interceptors.response.use(r=>r, err => {
  const normalized = { status: err.response?.status || 500, message: err.response?.data?.message || err.message || "Unknown", details: err.response?.data || null };
  return Promise.reject(normalized);
});
export default api;
