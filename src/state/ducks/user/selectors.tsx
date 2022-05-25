import * as R from 'ramda';

const getUsers  = state => R.pathOr([], ['user', 'users' ], state);

export default {
    getUsers,
}