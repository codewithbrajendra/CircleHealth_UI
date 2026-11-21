//users actions
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  LOG_OUT,
} from "../constants";

import ApiHelper from "../../Helpers/ApiHelpers";

// login
export function logInUser(Formdata) {
  return (dispatch) => {
    dispatch(fetchUserBegin());
    console.warn("Formdata", Formdata);
    return (
      // return ApiHelper("https://jsonplaceholder.typicode.com/todos/1", "GET", "")
      ApiHelper("auth-service/auth/admin-login", "POST", Formdata)
        .then((res) => {
          dispatch(fetchUserSuccess(res.data));
          console.warn("data", res.data);
          // console.warn("Formdata", Formdata);
          return;
        })
        .catch((err) => dispatch(fetchUserFailure(err.response)))
    );

    // return fetch("https://jsonplaceholder.typicode.com/users/")
    //   .then(handleErrors)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     dispatch(fetchUserSuccess(json));
    //     //console.warn("data", json);
    //     console.warn("Formdata", Formdata);
    //     return;
    //   })
    //   .catch((error) => dispatch(fetchUserFailure(error)));
  };
}

// logout
export const logOutUser = () => ({
  type: LOG_OUT,
});

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    //throw Error(response.statusText);
    throw Error(response.statusText);
  }
  return response;
}

export const fetchUserBegin = () => ({
  type: FETCH_USERS_BEGIN,
});

export const fetchUserSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});
