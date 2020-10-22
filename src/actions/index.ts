import * as types from './../constants/actionTypes';

export const checkOut = (check: boolean) => {
    return  {
        type: types.LOG_OUT,
        check
    }
}

export const checkIn = (check: boolean) => {
    return {
        type: types.LOG_IN,
        check
    }
}

export const registerSuccess = (acc: Acc) => {
    return {
        type: types.REGISTER_SUCCESS,
        acc
    }
}

export const addCart = (products: Array<Product>) => {
    return {
        type: types.ADD_CART,
        products
    }
}

export const deleteCart = (id: any) => {
    return {
        type: types.DELETE_CART,
        id
    }
}

export const updateCart = (listProduct: Array<Product>, product: Product, quantity: number) => {
    return {
        type: types.UPDATE_CART,
        listProduct,
        product,
        quantity
    }
}

export const getInfor = (dataInfor: DataInfor) => {
    return {
        type: types.GET_INFOR,
        dataInfor
    }
}

export const updateInfor = (data: DataInfor) => {
    return {
        type: types.UPDATE_INFOR,
        data,
    }
}

export const getHistory = (data: DataHistory) => {
    return {
        type: types.GET_HISTORY_USER,
        data,
    }
}