import { createContext } from "react";

export const initialState = {
  auth: {},
  noteData: [],
  isSearching: false,
  searchNoteResult: [],
  searchInput: "",
  isViewing: false,
  isEdit: false,
  viewingNote: "",
  selectedNote: {},
  viewingMode: "",
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;