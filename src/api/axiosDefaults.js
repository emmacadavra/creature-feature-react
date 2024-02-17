import axios from "axios";

axios.defaults.baseURL =
  "https://creature-feature-api-43ea2b93451a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
