import axios from "axios";
import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  GET_ERRORS,
  ADMIN_DELETE_USER,
} from "./types";

export const updateUser = (user, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/update", user);
    history.push("/successMessage");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  const res = await axios.get("/api/users/all");
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const getUser = (username, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${username}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    history.push("/admin");
  }
};

export const adminDeleteUser = (username) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the account and all its data!"
    )
  ) {
    await axios.delete(`/api/users/${username}`);
    dispatch({
      type: ADMIN_DELETE_USER,
      payload: username,
    });
  }
};

export const deleteUser = (username) => async (dispatch) => {
  await axios.delete(`/api/users/${username}`);
  dispatch({
    type: DELETE_USER,
    payload: username,
  });
};
