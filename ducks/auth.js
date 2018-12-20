import { authApi } from '@/services/api';
import { Record } from 'immutable';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import Router from 'next/router';
import cookie from 'js-cookie';
import decode from 'jwt-decode';
/**
 * Constants
 * */
export const moduleName = 'auth';
const prefix = `${process.env.APP_NAME}/${moduleName}`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const SIGN_CHECK_REQUEST = `${prefix}/SIGN_CHECK_REQUEST`;
export const SIGN_CHECK_SUCCESS = `${prefix}/SIGN_CHECK_SUCCESS`;
export const REDIRECT = `${prefix}/REDIRECT`;
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  user: null,
  error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, path, error } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_CHECK_SUCCESS:
      return state
        .set('user', payload.user)
        .set('loading', false)
        .set('error', null);

    case SIGN_IN_ERROR:
      return state.set('error', error);

    case SIGN_OUT_SUCCESS:
      return state.set('user', null).set('error', null);

    case REDIRECT:
      Router.push(path);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const userSelector = state => state[moduleName].user;
export const errorSelector = state => state[moduleName].error;

/**
 * Init logic
 */

/**
 * Action Creators
 * */

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT_REQUEST,
  };
}

export function signCheck() {
  return {
    type: SIGN_CHECK_REQUEST,
  };
}

/**
 * Sagas
 **/

export function* signInSaga({ payload: { email, password } }) {
  try {
    const {
      data: { token, refreshToken },
    } = yield call(authApi.signIn, email, password);

    // Add tokens to cookie
    cookie.set('token', token);
    cookie.set('refreshToken', refreshToken);

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user: decode(token) },
    });

    yield put({
      type: REDIRECT,
      path: '/',
    });
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error: error.response ? error.response.data : error,
    });
  }
}

export function* signCheckSaga() {
  try {
    yield call(authApi.signCheck);
    console.log('Not auth');
    yield put({
      type: SIGN_CHECK_SUCCESS,
      payload: decode(token),
    });
  } catch (e) {
    console.log('Not auth');
  }
}

export function* signOutSaga() {
  yield call(authApi.signOut);
  yield put({
    type: SIGN_OUT_SUCCESS,
  });
  yield put({
    type: REDIRECT,
    path: '/',
  });
}

export function* saga() {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    takeEvery(SIGN_CHECK_REQUEST, signCheckSaga),
  ]);
}
