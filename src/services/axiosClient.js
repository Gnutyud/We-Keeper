import axios from 'axios';

const baseURL = 'https://wekeep-app-39b7e-default-rtdb.asia-southeast1.firebasedatabase.app';

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
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