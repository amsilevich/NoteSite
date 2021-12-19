let LOGIN_SUCCEED = "LOGIN_SUCCEED";
let LOGIN_FAILED = "LOGIN_FAILED";
let REFRESH_FAILED = "REFRESH_FAILED";
let DATA_LOADED = "DATA_LOADED"
let NON_AUTHORIZED = "NON_AUTHORIZED"

export const loginSucceed = () => {
    return {
        type: LOGIN_SUCCEED
    };
}

export const loginFailed = data => {
    return {
        type: LOGIN_FAILED,
        payload: data
    };
}

export const refreshFailed = data => {
    return {
        type: REFRESH_FAILED,
        payload: data
    };
}

export const dataLoaded = data => {
    return {
        type: DATA_LOADED,
        payload: data
    };
}

export const nonAuthorized = data => {
    return {
        type: NON_AUTHORIZED,
        payload: data
    };
}

export function reducer(state, action) {
    console.log(state)
    switch (action.type) {
      case LOGIN_SUCCEED:
        state['Authorized'] = true
        return state;
      case DATA_LOADED:
        state['LoadedData'] = true
        return state
      case NON_AUTHORIZED:
        document.location.href = 'http://localhost:3000/';

    }
    return state;
};