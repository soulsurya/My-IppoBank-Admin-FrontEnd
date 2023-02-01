import { FETCH_USER } from "./types";

import { makeGetAPICAll } from "./../../services/api";
import { API } from "./../../services/constants";


export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER,
        payload: user,
    };
};

export const fetchUser = () => {
    return (dispatch) => {
        makeGetAPICAll(API.user, {}, true).then((response) => {
            let user = response.data;
            dispatch(fetchUserSuccess(user));
        });
    };
};