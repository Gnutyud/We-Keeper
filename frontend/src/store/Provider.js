import React from "react";
import AppContext, { initialState } from "./context";
import reducer, { actions } from "./reducer";

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    auth: state.auth,
    noteData: state.noteData,
    isSearching: state.isSearching,
    searchNoteResult: state.searchNoteResult,
    searchInput: state.searchInput,
    isViewing: state.isViewing,
    isEdit: state.isEdit,
    viewingNote: state.viewingNote,
    selectedNote: state.selectedNote,
    viewingMode: state.viewingMode,
    setAuth: (authData) => {
      dispatch({ type: actions.SET_AUTH, authData});
    },
    addNoteItem: (noteItem) => {
      dispatch({ type: actions.ADD_NOTE_ITEM, noteItem });
    },
    removeNoteItem: (noteItemId) => {
      dispatch({ type: actions.REMOVE_NOTE_ITEM, noteItemId });
    },
    fetchNotes: (noteData) => {
      dispatch({ type: actions.FETCH_NOTE_LIST, noteData});
    },
    turnOnSearchingMode: () => {
      dispatch({type: actions.TURN_ON_SEARCHING_MODE});
    },
    turnOffSearchingMode: () => {
      dispatch({type: actions.TURN_OFF_SEARCHING_MODE});
    },
    setViewingMode: (mode) => {
      dispatch({type: actions.SET_VIEWING_MODE, mode});
    },
    turnOffViewingMode: () => {
      dispatch({type: actions.TURN_OFF_VIEWING_MODE});
    },
    setSearchResult: (searchResult) => {
      dispatch({type: actions.SET_SEARCH_RESULT, searchResult});
    },
    setSearchInput: (searchInput) => {
      dispatch({type: actions.SET_SEARCH_INPUT, searchInput});
    },
    setSelectedNote: (noteData) => {
      dispatch({type: actions.SET_SELECTED_NOTE, noteData});
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;