import axiosClient from "./axiosClient";

const appApi = {
  getNotes : () => {
    return axiosClient.get('/notes.json');
  },
  deleteNote: (id) => {
    return axiosClient.delete(`/notes/${id}.json`);
  },
  saveNote: (data) => {
    return axiosClient.post('/notes.json', data);
  },
  updateNote: (id, data) => {
    return axiosClient.patch(`/${id}.json`, data)
  }
}

export default appApi;