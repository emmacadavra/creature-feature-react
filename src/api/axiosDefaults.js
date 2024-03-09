import axios from "axios";

axios.defaults.baseURL =
  "https://creature-feature-api-43ea2b93451a.herokuapp.com/";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosResp = axios.create();
