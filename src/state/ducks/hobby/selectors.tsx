import * as R from 'ramda';

const getUser  = state => R.pathOr('', ['hobbies'], state);

export default {
    getUser,
}