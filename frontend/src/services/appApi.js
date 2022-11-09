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
};

export default appApi;
