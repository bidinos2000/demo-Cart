import { combineReducers } from 'redux';
import checkOut from './login';
import accRegister from './register';
import productAddCard from './addCart';
export const myReducer = combineReducers({
    checkOut,
    accRegister,
    productAddCard
});

