import { LOG_IN, LOG_OUT } from "../constants";

//cart actions
export const logIn = (data) => {
  console.warn("action", data);
  return { type: LOG_IN, data: data };
};
export const LogOut = (data) => {
  //console.warn("action", data);
  return { type: LOG_OUT, data: data };
};
