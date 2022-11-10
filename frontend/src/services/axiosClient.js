import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// axios client
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(function (config) {
  return config;
},
  function (err) {
    return Promise.reject(err)
  }
);

axiosClient.interceptors.response.use(
  function (res) {
    return res.data;
  },
  function (err) {
    return Promise.reject(err)
  }
);

export default axiosClient;

// Private axios
export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

axiosPrivate.interceptors.request.use(function (config) {
  return config;
},
  function (err) {
    return Promise.reject(err)
  }
);

axiosPrivate.interceptors.response.use(
  function (res) {
    return res.data;
  },
  function (err) {
    return Promise.reject(err)
  }
);
