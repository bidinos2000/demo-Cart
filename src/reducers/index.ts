import { combineReducers } from 'redux';
import checkOut from './login';
import accRegister from './register';
import productAddCard from './addCart';
import dataInfor from './settingProfile';
import history from './history';

export const myReducer = combineReducers({
    checkOut,
    accRegister,
    productAddCard,
    dataInfor,
    history,
});

