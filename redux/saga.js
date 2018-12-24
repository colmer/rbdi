import { delay } from 'redux-saga';
import { all, call, fork, put, take, spawn, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { saga as authSaga } from '@/ducks/auth';
import { actionTypes, failure, loadDataSuccess, tickClock } from '../actions';

es6promise.polyfill();

function* rootSaga(client) {
  yield all([call(authSaga, client)]);
}

export default rootSaga;
