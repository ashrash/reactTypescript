import * as R from 'ramda';

const getHobbies  = state => R.pathOr([], ['hobby', 'hobby'], state);

export default {
    getHobbies,
}