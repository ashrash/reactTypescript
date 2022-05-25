import * as R from 'ramda';

const getUser  = state => R.pathOr('', ['user'], state);

export default {
    getUser,
}