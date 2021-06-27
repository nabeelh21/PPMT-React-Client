import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  ADMIN_DELETE_USER,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.username !== action.payload),
      };
    case ADMIN_DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.username !== action.payload),
      };
    default:
      return state;
  }
}
