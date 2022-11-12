import { createContext } from 'react';

export const initialState = {
  auth: {},
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
