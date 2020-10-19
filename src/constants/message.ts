import { message } from 'antd';

export const ERROR_PASSWORD = () =>{
    message.error('Password Error!');
};

export const ERROR_ACCOUNT = () =>{
    message.error('Account Does Not Exist!');
};

export const RGT_SUCCESS = () =>{
    message.success('Register Success!');
};

export const RGT_FAIL = () =>{
    message.error('Account already exist!');
};

export const ADD_CART = () => {
    message.success('Add card success!');
}

export const CHECK_OUT = () => {
    message.success('Thank you for your purchase');
}

export const CHECK_QUANTITY = () => {
    message.warn('Quantity is Positive Number Or You can Delete into Cart');
}