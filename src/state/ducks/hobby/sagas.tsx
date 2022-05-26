import axios from 'axios';
import * as R from 'ramda';
import {
    select, takeEvery, all, call, put,
} from 'redux-saga/effects';
import { hobby } from '../../../constants/dtos/hobby';
import validateClass from '../../../utils/validation.middleware';
import types from '../user/types';
import Types from './types';

function* getHobbyByUserId(payload) {
    try {
        const { payload: userId } = payload;
        const response = yield call(axios.get, `/api/hobbies/${userId}`)
        const data = R.prop('data', response);
        if(data) {
            yield put({ type: Types.SET_HOBBY_DATA, payload: data})
        } else {
            yield put({ type: Types.SET_HOBBY_DATA, payload: []})
        }
    } catch(e) {
        console.log('error');
    }
}

function* addHobby(payload) {
    try {
        yield put({ type: types.CLEAR_ERROR });
        const { payload: hobbyData } = payload;
        const { textInputState, selectedRowId } = hobbyData;
        const validation = yield call(validateClass, hobby, textInputState);
        if(!validation) {
            if(selectedRowId) {
                const response = yield call(axios.post, `/api/hobbies/${selectedRowId}`, textInputState);
                const final = yield call(getHobbyByUserId, {payload: selectedRowId});
            } else {
            yield put({ type: types.SET_ERROR, payload: 'User not selected'});

            }
        } else {
            yield put({ type: types.SET_ERROR, payload: validation});
        }
    } catch(e) {
        console.log('error');
    }
}


function* deleteHobby(payload) {
    try {
        const { payload: hobbyData } = payload;
        const { textInputState, selectedRowId } = hobbyData;
        if(selectedRowId) {
            const response = yield call(axios.delete, `/api/hobbies/${selectedRowId}/${textInputState}`);
            const final = yield call(getHobbyByUserId, {payload: selectedRowId});
        }

    } catch(e) {
        console.log('error');
    }
}

function* watchGetHobbyByUserId() {
    yield takeEvery(Types.GET_HOBBY, getHobbyByUserId);
}

function* watchAddHobby() {
    yield takeEvery(Types.ADD_HOBBY, addHobby);
}

function* watchDeleteHobby() {
    yield takeEvery(Types.DELETE_HOBBY, deleteHobby);
}

export function* combinedSaga() {
    yield all([
        watchGetHobbyByUserId(),
        watchAddHobby(),
        watchDeleteHobby(),
    ]);
}
  