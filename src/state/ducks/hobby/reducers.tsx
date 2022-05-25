import Types from "./types"
import * as R from 'ramda';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_HOBBY_DATA: {
            return {
                ...state,
                hobby: R.pathOr('Error fetching hobby data', ['payload', 'data', 'hobbies'], action),
            }
        }
        case Types.CLEAR_HOBBY:{
            return {};
        }
        default: {
            return state;
        }
    }
}

export default reducer;