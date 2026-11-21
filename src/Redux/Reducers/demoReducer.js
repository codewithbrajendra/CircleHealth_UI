import { LOG_IN, LOG_OUT } from "../constants";

let user = JSON.parse(localStorage.getItem("LoggedIn"));
let token = JSON.parse(localStorage.getItem("Token"));

const initialState = {
  LoggedIn: user ? user : false,
  email: "admin@gmail.com",
  password: "1234",
  userId: token ? token : "",
};

export default function authData(state = initialState, action) {
  if (action.type === LOG_IN) {
    //console.log("Reducer", action.data);
    if (
      action.data.email === state.email &&
      action.data.password === state.password
    ) {
      localStorage.setItem("LoggedIn", true);
      return { ...state, LoggedIn: true };
    } else {
      return { ...state };
    }
  }
  if (action.type === LOG_OUT) {
    localStorage.setItem("LoggedIn", false);
    return { ...state, LoggedIn: false };
  }
  return state;
}
