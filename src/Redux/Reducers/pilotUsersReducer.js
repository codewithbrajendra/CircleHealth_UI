import {
  FILTER_USER,
  FETCH_PILOT_USERS_BEGIN,
  FETCH_PILOT_USERS_SUCCESS,
  FETCH_PILOT_USERS_FAILURE,
  GET_PILOT_USERS,
} from "../constants";
const initialState = {
  data: [
    {
      id: 1,
      firstName: "anil",
      surName: "sahu",
      email: "anil@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 2,
      firstName: "ravi",
      surName: "dakate",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 3,
      firstName: "Rohan",
      surName: "jha",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 4,
      firstName: "Pinki",
      surName: "dhakad",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
  ],
  copyData: [
    {
      id: 1,
      firstName: "anil",
      surName: "sahu",
      email: "anil@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 2,
      firstName: "ravi",
      surName: "dakate",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 3,
      firstName: "Rohan",
      surName: "jha",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
    {
      id: 4,
      firstName: "Pinki",
      surName: "dhakad",
      email: "ravi@gmail.com",
      dob: "12-12-1988",
      therapyPreference: "john",
      gender: "Male",
      ethnicity: "Indian",
      accessCode: "12345",
    },
  ],
  loading: false,
  error: null,
};

export default function pilotUsers(state = initialState, action) {
  switch (action.type) {
    case FETCH_PILOT_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PILOT_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.users,
        copyData: action.payload.users,
      };

    case FETCH_PILOT_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };

    case FILTER_USER:
      //console.log("Filter reducer", action.data);
      let { data, copyData } = state;
      //console.log("copy ", copyData);
      if (
        action.data.name === "" &&
        action.data.name === "" &&
        action.data.name === ""
      ) {
        return { ...state, data: copyData };
      } else {
        return {
          ...state,
          data: data
            .filter((item) =>
              item.name.toLowerCase().includes(action.data.name.toLowerCase())
            )
            .filter((item2) =>
              item2.surname
                .toLowerCase()
                .includes(action.data.surname.toLowerCase())
            )
            .filter((item3) =>
              item3.email
                .toLowerCase()
                .includes(action.data.email.toLowerCase())
            ),
        };
      }

    case GET_PILOT_USERS: {
      return {
        data: [action.payload.data],
      };
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
