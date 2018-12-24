import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './reducer';
import rootSaga from './saga';

export default class StoreConfig {
  constructor() {
    // this.client = client;
    this.sagaMiddleware = createSagaMiddleware();

    this.bindMiddleware = middleware => {
      if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
      }
      return applyMiddleware(...middleware);
    };
  }

  configureStore = initialState => {
    const store = createStore(
      reducer,
      initialState,
      this.bindMiddleware([this.sagaMiddleware, logger]),
    );

    store.runSagaTask = () => {
      store.sagaTask = this.sagaMiddleware.run(rootSaga);
    };

    store.runSagaTask();

    return store;
  };
}
