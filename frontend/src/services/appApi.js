import axiosClient from "./axiosClient";
import { axiosPrivate } from "./axiosClient";

const appApi = {
  getNotes: () => {
    return axiosClient.get('/notes.json');
  },
  deleteNote: (id) => {
    return axiosClient.delete(`/notes/${id}.json`);
  },
  saveNote: (data) => {
    return axiosClient.post('/notes.json', data);
  },
  updateNote: (id, data) => {
    return axiosClient.put(`/notes/${id}.json`, data);
  },
  login: (data) => {
    return axiosPrivate.post('/auth', data)
  },
  getRefreshToken: () => axiosPrivate.get('/auth/refresh'),
}

export default appApi;