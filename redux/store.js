import { createStore, applyMiddleware } from 'redux'
import sagaMiddlewareFactory, { END } from 'redux-saga'

import reducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = sagaMiddlewareFactory()

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore (initialState) {
  const store = createStore(
    reducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  ) 

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.stopSagaTask = async () => {
    store.dispatch(END);

    await store.sagaTask.done;
  }

  store.runSagaTask()
   
  

  return store
}

export default configureStore