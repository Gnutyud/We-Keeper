import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// axios client
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export default axiosClient;

// Private axios
export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

axiosPrivate.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);
