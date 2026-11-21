import {
  ADD_PILOT_USERS_BEGIN,
  ADD_PILOT_USERS_FAILURE,
  ADD_PILOT_USERS_SUCCESS,
} from "../constants";

const initialState = {
  data: "",
  loading: false,
  error: null,
};

export default function initialPilotData(state = initialState, action) {
  switch (action.type) {
    case ADD_PILOT_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_PILOT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.users,
      };

    case ADD_PILOT_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
