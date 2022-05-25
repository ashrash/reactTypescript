import axios from 'axios';
import * as R from 'ramda';
import {
    select, takeEvery, all, call, put,
} from 'redux-saga/effects';
import Types from './types';

function* getHobbyByUserId(payload) {
    try {
        const { payload: userId } = payload;
        const response = yield call(axios.get, `/api/hobbies/${userId}`)
        const data = R.prop('data', response);
        if(data) {
            yield put({ type: Types.SET_HOBBY_DATA, payload: data})
        }
    } catch(e) {
        console.log('error');
    }
}

function* watchGetHobbyByUserId() {
    yield takeEvery(Types.GET_HOBBY, getHobbyByUserId);
}

export function* combinedSaga() {
    yield all([
        watchGetHobbyByUserId(),
    ]);
}
  