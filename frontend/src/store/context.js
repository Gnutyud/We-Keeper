import { createContext } from "react";

export const initialState = {
  noteData: [],
  isSearching: false,
  searchNoteResult: [],
  searchInput: "",
  isViewing: false,
  viewingNote: "",
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});
// const AppContext = createContext();

export default AppContext;