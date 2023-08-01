import axios from "axios";
export const baseMapUrl = process.env.REACT_APP_MAP_URL;

const mapServer = axios.create({
  baseURL: baseMapUrl,
});

mapServer.interceptors.request.use(
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

export default mapServer;
