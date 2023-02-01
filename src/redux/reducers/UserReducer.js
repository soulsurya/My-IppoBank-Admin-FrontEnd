import { FETCH_USER } from "../actions/types";

export const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return { user: action.payload, ...state };
        default:
            return state;
    }
};
