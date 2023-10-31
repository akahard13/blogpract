import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
})