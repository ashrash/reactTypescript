import { all } from 'redux-saga/effects';
import { combinedSaga as userSaga } from './user/sagas';
import { combinedSaga as hobbySaga } from './hobby/sagas';


export default function* rootSaga() {
  yield all([
    userSaga(),
    hobbySaga(),
  ]);
}
