import * as R from 'ramda';

const getUsers  = state => R.pathOr([], ['user', 'users' ], state);

const getError  = state => R.pathOr('', ['user', 'error'], state);

const getUserIdMax = (state) => R.reduce(R.max, 0, R.pluck('_id', getUsers(state)));

export default {
    getUsers,
    getUserIdMax,
    getError,
}