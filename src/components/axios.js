import axios from "axios";

const baseURL  = axios.create({
    baseURL: "https://api.github.com",
})

export default baseURL;