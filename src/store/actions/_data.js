/* eslint-disable no-unused-vars */
import { db, api } from 'services';
import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  GET_ITEMS,
  ERROR,
  SEARCH_MOVIE,
} from '../action-types';

function actionError(message) {
  return {
    type: ERROR,
    payload: message,
  };
}

export const searchMovie = (query) => (dispatch) => {
  api
    .searchMovie(query)
    .then((data) => {
      if (data?.Search) {
        dispatch({ type: SEARCH_MOVIE, payload: data.Search });
      } else {
        dispatch(actionError(data.Error));
      }
    })
    .catch((error) => dispatch(actionError(error.message)));
};

export const addItem = (uid, data) => (dispatch) => {
  if (uid) {
    db.addItem(uid, data)
      .then(() => dispatch({ type: ADD_ITEM, payload: data }))
      .catch((error) => dispatch(actionError(error.message)));
  } else {
    dispatch({ type: ADD_ITEM, payload: data });
  }
};

export const updateItem = (uid, data) => (dispatch) => {
  if (uid) {
    db.updateItem(uid, data)
      .then(() => dispatch({ type: UPDATE_ITEM, payload: data }))
      .catch((error) => dispatch(actionError(error.message)));
  } else {
    dispatch({ type: UPDATE_ITEM, payload: data });
  }
};

export const removeItem = (uid, id) => (dispatch) => {
  if (uid) {
    db.removeItem(uid, id)
      .then(() => dispatch({ type: REMOVE_ITEM, payload: id }))
      .catch((error) => dispatch(actionError(error.message)));
  } else {
    dispatch({ type: REMOVE_ITEM, payload: id });
  }
};

export const getItems = (uid) => (dispatch) => {
  db.getItems(uid)
    .then((response) => {
      const data = [];
      response.forEach((item) => data.push(item.data()));
      dispatch({ type: GET_ITEMS, payload: data });
    })
    .catch((error) => dispatch(actionError(error.message)));
};
