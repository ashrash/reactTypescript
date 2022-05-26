import axios from 'axios';
import {
    takeEvery, all, call, put, select,
} from 'redux-saga/effects';
import * as R from 'ramda';
import Types from './types';
import HobyTypes from '../hobby/types';
import validateClass from '../../../utils/validation.middleware';
import { user } from '../../../constants/dtos/user';
import selectors from './selectors';

function* addUser(payload) {
    try {
    yield put({ type: Types.CLEAR_ERROR });
    const userData = R.pathOr({}, ['payload','textInputState'], payload);
    const validation = yield call(validateClass, user, userData);
    if(!validation) {
        const _id: number = yield select(selectors.getUserIdMax);
        const response = yield call(axios.post, '/api/users', {_id: _id + 1, ...userData});
        const fetchResponse = yield call(fetchAllUsers);
        console.log(response);    
    } else {
        yield put({ type: Types.SET_ERROR, payload: validation});
    }
    
    }catch(e){
        console.log('error')
    }
}

function* fetchAllUsers() {
    const response = yield call(axios.get, '/api/users');
    const allUserData = R.prop('data', response);
    if(allUserData) {
        yield put({ type: Types.SET_USER_DATA, payload: allUserData});
    }
}

function* deleteUser(payload) {
    const userToDelete = R.pathOr({}, ['payload','textInputState'], payload);
    const response = yield call(axios.delete, `/api/users/${userToDelete}`);
    const fetchResponse = yield call(fetchAllUsers);
    yield put({type: HobyTypes.CLEAR_HOBBY });
}

function* watchAddUser() {
    yield takeEvery(Types.ADD_USER, addUser);
}

function* watchFetchAllUser() {
    yield takeEvery(Types.FETCH_ALL_USERS, fetchAllUsers);
}

function* watchDeleteUser() {
    yield takeEvery(Types.DELETE_USER, deleteUser);
}

export function* combinedSaga() {
    yield all([
        watchAddUser(),
        watchFetchAllUser(),
        watchDeleteUser(),
    ]);
}
  