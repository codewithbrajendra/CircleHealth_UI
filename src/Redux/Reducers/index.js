import { combineReducers } from "redux";
import authUser from "./userReducer";
import pilotUsers from "./pilotUsersReducer";
export default combineReducers({
  authUser,
  pilotUsers,
});
