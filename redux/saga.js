/* global fetch */

import { delay } from 'redux-saga';
import { all, call, put, take, spawn, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { saga as authSaga } from '@/ducks/auth';
import { actionTypes, failure, loadDataSuccess, tickClock } from '../actions';

es6promise.polyfill();
// }

function* rootSaga() {
  yield all([call(authSaga)]);
}

export default rootSaga;
