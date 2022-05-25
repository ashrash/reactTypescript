import axios from 'axios';
import {
    select, takeEvery, all, call, put,
} from 'redux-saga/effects';
import * as R from 'ramda';
import Selectors from './selectors';
import Types from './types';

function* addUser() {
    const user = yield select(Selectors.getUser);
    console.log('reached sagas! hurrraaaay!');
}

function* fetchAllUsers() {
    const response = yield call(axios.get, '/api/users');
    const allUserData = R.prop('data', response);
    if(allUserData) {
        yield put({ type: Types.SET_USER_DATA, payload: allUserData});
    }
}

function* watchAddUser() {
    yield takeEvery(Types.ADD_USER, addUser);
}

function* watchFetchAllUser() {
    yield takeEvery(Types.FETCH_ALL_USERS, fetchAllUsers);
}

export function* combinedSaga() {
    yield all([
        watchAddUser(),
        watchFetchAllUser(),
    ]);
}
  