import { all, call } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { saga as authSaga } from '@/ducks/auth';

es6promise.polyfill();

function* rootSaga(client) {
  yield all([call(authSaga, client)]);
}

export default rootSaga;
