import axios from "axios";
export const baseUrl = process.env.REACT_APP_BACKEND_URL;

const server = axios.create({
  baseURL: baseUrl,
});

server.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.access_token;
    config.headers = jwtToken ? {
      Authorization: `Bearer ${jwtToken}`,
    } : {};
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default server;
