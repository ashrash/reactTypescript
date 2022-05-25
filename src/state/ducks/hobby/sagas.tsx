import {
    select, takeEvery, all, call, put,
} from 'redux-saga/effects';
import Types from './types';

function* addHobby() {
    console.log('reached sagas! hurrraaaay!');
}

function* watchAddUser() {
    yield takeEvery(Types.ADD_HOBBY, addHobby);
}

export function* combinedSaga() {
    yield all([
        watchAddUser(),
    ]);
}
  