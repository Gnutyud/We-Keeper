export const actions = {
  SET_AUTH: 'SET_AUTH',
  TURN_ON_SEARCHING_MODE: 'TURN_ON_SEARCHING_MODE',
  TURN_OFF_SEARCHING_MODE: 'TURN_OFF_SEARCHING_MODE',
  SET_VIEWING_MODE: 'SET_VIEWING_MODE',
  TURN_OFF_VIEWING_MODE: 'TURN_OFF_VIEWING_MODE',
  SET_NOTE_LIST: 'SET_NOTE_LIST',
  SET_SEARCH_RESULT: 'SET_SEARCH_RESULT',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_SELECTED_NOTE: 'SET_SELECTED_NOTE',
  LOG_OUT: 'LOG_OUT',
  GET_PROFILE: 'GET_PROFILE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_AUTH: {
      return {
        ...state,
        auth: action.authData,
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
        viewingMode: 'view',
      };
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        auth: {},
      };
    }
    case actions.GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
