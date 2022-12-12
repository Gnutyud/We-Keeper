import axiosClient, { axiosPrivate } from './axiosClient';

const appApi = {
  login: (data) => axiosPrivate.post('/auth', data),
  getRefreshToken: () =>
    axiosClient.get('/auth/refresh', {
      withCredentials: true,
    }),
  logout: () =>
    axiosClient('/auth/logout', {
      method: 'post',
      withCredentials: true,
    }),
  register: (data) => axiosClient.post('/users', data),
  loginViaGoogle: (accessToken) => axiosClient.post('/auth/login/success', { token: accessToken }),
};

export default appApi;
