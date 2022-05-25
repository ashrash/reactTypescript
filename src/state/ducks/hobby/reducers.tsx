import Types from "./types"

const reducer = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_HOBBY_DATA: {
            return {
                ...state,
                hobbies: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;