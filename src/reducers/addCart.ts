import * as types from './../constants/actionTypes';

const localData = localStorage.getItem('cart');
var dataInLocal: Array<Product> = [];
if(localData){
    dataInLocal = JSON.parse(localData);
}

const initialState = localData ? dataInLocal: [];


var findIndex = (id: any, cartProduct:Array<Product>) => {
    var result = -1;
    cartProduct.forEach((product, index) => {
        if(product.id === id){
            result = index;
        }
    });
    return result;
}

const myReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case types.ADD_CART:
            state = action.products
            return state;
        case types.DELETE_CART: 
            const index = findIndex(action.id, state);
            state.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case types.UPDATE_CART:
            const listProduct = action.listProduct;
            const productUpdate = action.product;
            const quantity = action.quantity;
            listProduct.forEach((product: Product) => {
                if(product.id === productUpdate.id) {
                    product.number = quantity;
                }
            });
            state = listProduct;
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}

export default myReducer;