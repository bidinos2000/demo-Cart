import * as types from './../constants/actionTypes';

const initialState: boolean = localStorage.getItem('loginSuccess') === '0' ? false : true;

const myReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case types.LOG_IN:
            return state;
        case types.LOG_OUT:
            state = action.check;
            return state;
        default: return state;
    }
}

export default myReducer;