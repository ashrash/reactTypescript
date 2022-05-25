import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { initialState } from '../models';

import { reducers, sagas } from './ducks';

export default function configureStore(initialState?: initialState): Store<initialState> {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    reducers as any,
    initialState,
    composeEnhancers(applyMiddleware(logger, sagaMiddleware))
  )
  let sagaTask = sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./ducks', () => {
      /* eslint-disable-next-line */
      const { reducers, sagas } = require('./ducks');

      store.replaceReducer(reducers);
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(sagas);
      });
    });
  }
  return store;
}
