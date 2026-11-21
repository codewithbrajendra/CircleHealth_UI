import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  LOG_OUT,
} from "../constants";

let user = JSON.parse(localStorage.getItem("LoggedIn"));
let userType = localStorage.getItem("UserType");

const initialState = {
  LoggedIn: user ? user : false,
  UserType: userType ? userType : false,
  accessToken: "",
  userUniqueId: "",
  data: [],
  loading: false,
  error: null,
};

export default function userAuth(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      //console.log("reducer res", action.payload.users);

      if (action.payload.users && action.payload.users.code === 200) {
        localStorage.setItem("LoggedIn", true);
        localStorage.setItem("Token", action.payload.users.data.accessToken);
        localStorage.setItem(
          "RefreshToken",
          action.payload.users.data.refreshToken
        );
        localStorage.setItem(
          "UserUniqueId",
          action.payload.users.data.userDto.userUniqueId
        );
        localStorage.setItem(
          "UserId",
          action.payload.users.data.userDto.userId
        );
        localStorage.setItem(
          "UserType",
          action.payload.users.data.userDto.userType
        );

        return {
          ...state,
          LoggedIn: true,
          UserType: action.payload.users.data.userDto.userType,
          accessToken: action.payload.users.data.accessToken,
          userUniqueId: action.payload.users.data.userDto.userUniqueId,
          loading: false,
          data: action.payload.users,
        };
      } else {
        return {
          ...state,
          loading: false,
          data: [],
        };
      }

    case FETCH_USERS_FAILURE:
      if (action.payload.error) {
        return {
          ...state,
          loading: false,
          error: action.payload.error.data.message,
          data: [],
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "Something went wrong try again.",
          data: [],
        };
      }

    case LOG_OUT:
      // The request failed. It's done. So set loading to "false".
      localStorage.removeItem("LoggedIn");
      localStorage.removeItem("Token");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("UserUniqueId");
      localStorage.removeItem("UserId");
      localStorage.removeItem("UserType");
      localStorage.clear();
      return {
        ...state,
        LoggedIn: false,
        accessToken: "",
        userUniqueId: "",
        loading: false,
        error: null,
        data: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
