import axios from "axios";

const api = axios.create({
    baseURL:'//api.themoviedb.org/3/'
});
export  default api;