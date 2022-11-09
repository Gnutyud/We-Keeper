import axiosClient from './axiosClient';
import { axiosPrivate } from './axiosClient';

const appApi = {
  login: (data) => {
    return axiosPrivate.post('/auth', data);
  },
  getRefreshToken: () =>
    axiosClient.get('/auth/refresh', {
      withCredentials: true,
    }),
  logout: () =>
  axiosClient('/auth/logout', {
    method: "post",
    withCredentials: true,
  }),
  register: (data) => {
    return axiosClient.post("/users", data);
  }
};

export default appApi;
