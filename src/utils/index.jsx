import axios from "axios";


export const imageUrl = "https://lost-and-found-api-r3ku.onrender.com";
// export const imageUrl = "http://localhost:5000";


const productionUrl = "https://lost-and-found-api-r3ku.onrender.com/api/v1";
// const productionUrl = "http://localhost:5000/api/v1";


export const customFetch = axios.create({
  baseURL: productionUrl,
  withCredentials: true,
});

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

customFetch.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
