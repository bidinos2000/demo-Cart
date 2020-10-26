import { stat } from 'fs';
import * as types from './../constants/actionTypes';

const initialState: DataInfor = {
    id: '',
    email: '',
    password: '',
    lastName: '',
    firstName: '',
} ;

const myReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case types.GET_INFOR:
            state = action.dataInfor;
            return state;
        case types.UPDATE_INFOR:
            state = action.data;
            return state;
        default: return state;
    }
}

export default myReducer;