import axios from "axios";
import { getItem } from "./localStorage";

let BaseApi = axios.create({
    'baseURL': "http://localhost:8000/api/"
})

const Api = () => {
    let token = getItem('token');
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        BaseApi.defaults.headers.common["Accept"] = "application/json";
    }
    return BaseApi;
}

export default Api;