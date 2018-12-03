import api from "@/services/auth-api";
import { Record } from "immutable";
import { all, call, put, take } from "redux-saga/effects";

/**
 * Constants
 * */
export const moduleName = "auth";
console.log(process.env.APP_NAME);
const prefix = `${process.env.APP_NAME}/${moduleName}`;
console.log(prefix, process.env.APP_NAME);
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
console.log(prefix, process.env.APP_NAME, SIGN_IN_REQUEST);
/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  user: null,
  error: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
      // case SIGN_UP_SUCCESS:
      return state.set("user", payload.user).set("loading", false);

    // case SIGN_UP_START:
    //   return state.set("loading", true);

    // case SIGN_UP_FAIL:
    //   return state.set("error", error);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const userSelector = state => state[moduleName].user;

/**
 * Init logic
 */

/**
 * Action Creators
 * */

export function signIn(email, password) {
  console.log("###########", SIGN_IN_REQUEST, process.env);
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  };
}

/**
 * Sagas
 **/

export function* signInSaga() {
  while (true) {
    const action = yield take(SIGN_IN_REQUEST);

    const {
      payload: { email, password }
    } = action;

    try {
      const user = yield call(api.signIn, email, password);

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      });
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      });
    }
  }
}

export function* saga() {
  yield all([signInSaga()]);
}
