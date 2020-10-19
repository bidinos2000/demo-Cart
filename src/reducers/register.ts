import * as types from './../constants/actionTypes';

const initialState: Acc = { email: '', password: ''} ;

const myReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case types.REGISTER_SUCCESS:
            state = action.acc
            return state;
        default: return state;
    }
}

export default myReducer;