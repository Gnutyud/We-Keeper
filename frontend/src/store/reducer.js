export const actions = {
  SET_AUTH: 'SET_AUTH',
  ADD_NOTE_ITEM: 'ADD_NOTE_ITEM',
  REMOVE_NOTE_ITEM: 'REMOVE_NOTE_ITEM',
  TURN_ON_SEARCHING_MODE: 'TURN_ON_SEARCHING_MODE',
  TURN_OFF_SEARCHING_MODE: 'TURN_OFF_SEARCHING_MODE',
  SET_VIEWING_MODE: 'SET_VIEWING_MODE',
  TURN_OFF_VIEWING_MODE: 'TURN_OFF_VIEWING_MODE',
  SET_NOTE_LIST: 'SET_NOTE_LIST',
  SET_SEARCH_RESULT: 'SET_SEARCH_RESULT',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_SELECTED_NOTE: 'SET_SELECTED_NOTE',
  LOG_OUT: 'LOG_OUT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_AUTH: {
      return {
        ...state,
        auth: action.authData,
      };
    }
    case actions.ADD_NOTE_ITEM: {
      let updatedNotes = [...state.noteData];
      let existingNoteItemIndex = state.noteData.findIndex((note) => note.id === action.noteItem.id);
      let existingNoteItem = state.noteData[existingNoteItemIndex];
      if (existingNoteItem) {
        updatedNotes[existingNoteItemIndex] = action.noteItem;
      } else {
        updatedNotes.push(action.noteItem);
      }
      return {
        ...state,
        noteData: updatedNotes,
      };
    }
    case actions.REMOVE_NOTE_ITEM: {
      let id = action.noteItemId;
      const updatedNotes = state.noteData.filter((note) => note.id !== id);
      return {
        ...state,
        noteData: updatedNotes,
        isViewing: false,
        viewingNote: '',
      };
    }
    case actions.SET_NOTE_LIST: {
      return {
        ...state,
        noteData: action.noteData,
      };
    }
    case actions.TURN_ON_SEARCHING_MODE: {
      return {
        ...state,
        isSearching: true,
      };
    }
    case actions.TURN_OFF_SEARCHING_MODE: {
      return {
        ...state,
        isSearching: false,
      };
    }
    case actions.SET_VIEWING_MODE: {
      return {
        ...state,
        viewingMode: action.mode,
        isSearching: false,
        searchInput: '',
        searchNoteResult: [],
      };
    }
    case actions.TURN_OFF_VIEWING_MODE: {
      return {
        ...state,
        viewingMode: '',
      };
    }
    case actions.SET_SEARCH_RESULT: {
      return {
        ...state,
        searchNoteResult: action.searchResult,
      };
    }
    case actions.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.searchInput,
      };
    }
    case actions.SET_SELECTED_NOTE: {
      return {
        ...state,
        selectedNote: action.noteData,
        isViewing: true,
        viewingMode: 'view',
      };
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        auth: {},
      };
    }
    default:
      return state;
  }
};

export default reducer;
