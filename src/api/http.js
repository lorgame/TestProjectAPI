import axios from "axios";

const HTTP = axios.create({
  baseURL: "https://www.breakingbadapi.com/api/",
  headers: {
    accept: "application/json"
  }
});

export default HTTP;
