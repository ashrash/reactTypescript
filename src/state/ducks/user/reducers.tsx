import Types from "./types"
import * as R from 'ramda';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_USER_DATA: {
            return {
                ...state,
                users: R.pathOr('Error fetching user data', ['payload', 'data'], action),
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;