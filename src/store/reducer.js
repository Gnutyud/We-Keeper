import appApi from "../services/appApi";

export const actions = {
  ADD_NOTE_ITEM: "ADD_NOTE_ITEM",
  REMOVE_NOTE_ITEM: "REMOVE_NOTE_ITEM",
  TURN_ON_SEARCHING_MODE: "TURN_ON_SEARCHING_MODE",
  TURN_OFF_SEARCHING_MODE: "TURN_OFF_SEARCHING_MODE",
  TURN_ON_VIEWING_MODE: "TURN_ON_VIEWING_MODE",
  TURN_OFF_VIEWING_MODE: "TURN_OFF_VIEWING_MODE",
  FETCH_NOTE_LIST: "FETCH_NOTE_LIST",
  SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
  SET_SEARCH_INPUT: "SET_SEARCH_INPUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_NOTE_ITEM: {
      let updatedNotes = [...state.noteData];
      let existingNoteItemIndex = state.noteData.findIndex(note => note.id === action.noteItem.id);
      let existingNoteItem = state.noteData[existingNoteItemIndex];
      if (existingNoteItem) {
        updatedNotes[existingNoteItemIndex] = action.noteItem;
      } else {
        updatedNotes.push(action.noteItem);
      }
      return {
        ...state,
        noteData: updatedNotes,
      }
    }
    case actions.REMOVE_NOTE_ITEM: {
      let id = action.noteItemId;
      appApi.deleteNote(id);
      const updatedNotes = state.noteData.filter((note) => note.id !== id)
      return {
        ...state,
        noteData: updatedNotes,
        isViewing: false,
        viewingNote: "",
      }
    }
    case actions.FETCH_NOTE_LIST: {
      return {
        ...state,
        noteData: action.noteData,
      }
    }
    case actions.TURN_ON_SEARCHING_MODE: {
      return {
        ...state,
        isSearching: true,
      }
    }
    case actions.TURN_OFF_SEARCHING_MODE: {
      return {
        ...state,
        isSearching: false,
      }
    }
    case actions.TURN_ON_VIEWING_MODE: {
      console.log(action.viewData);
      return {
        ...state,
        isViewing: true,
        viewingNote: action.viewData,
        isSearching: false,
        searchInput: "",
        searchNoteResult: [],
      }
    }
    case actions.TURN_OFF_VIEWING_MODE: {
      return {
        ...state,
        isViewing: false,
        viewingNote: "",
      }
    }
    case actions.SET_SEARCH_RESULT: {
      return {
        ...state,
        searchNoteResult: action.searchResult,
      }
    }
    case actions.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.searchInput,
      }
    }
    default:
      return state;
  }
};

export default reducer;