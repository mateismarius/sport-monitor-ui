import axios from "axios";


const axiosInstance = axios.create({
    baseURL : "https://localhost:7254/api/",
});

export default axiosInstance;