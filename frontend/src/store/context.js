import { createContext } from 'react';

export const initialState = {
  auth: {},
  profile: {
    username: '',
    email: '',
    status: '',
    joinDate: '',
    totalNotes: 0,
    roles: '',
    avatar: '',
    source: '',
  },
  noteData: [],
  isSearching: false,
  searchNoteResult: [],
  searchInput: '',
  selectedNote: {},
  viewingMode: '',
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;
