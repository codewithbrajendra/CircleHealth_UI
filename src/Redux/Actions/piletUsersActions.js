import { DELETE_USER, FILTER_USER, GET_PILOT_USERS } from "../constants";

//user actions
export const filterUser = (data) => {
  console.warn("action", data);
  return { type: FILTER_USER, data: data };
};
export const deleteUser = (data) => {
  console.warn("action", data);
  return { type: DELETE_USER, data: data };
};

export const getPilotUsers = (data) => {
  console.warn("action", data);
  return { type: GET_PILOT_USERS, data: data };
};
