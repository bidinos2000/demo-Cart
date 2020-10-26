import * as types from './../constants/actionTypes';
import axiosClient from './../untils/axiosClient';
import ARI_URL from './../constants/configProducts';
const initialState: Array<DataHistory> = [];

const myReducer = (state = initialState, action: any) => {
    let idUser = localStorage.getItem('id');
    let newlistHistory:Array<DataHistory> = [];
    let listHistory: Array<DataHistory> = action.data;
    switch(action.type) {
        case types.GET_HISTORY_USER:
            listHistory.forEach((data:DataHistory, index: number) => {
                if(data.idUser === idUser) {
                   newlistHistory.push(data);
                }
            });
            localStorage.setItem('history', JSON.stringify(newlistHistory));
            state = newlistHistory;
            return state;
        case types.DELETE_ACCOUNT:
            const filterHistory = listHistory.filter(function(data, index) {
                return data.idUser === idUser;
            });
            const filterHistory1 = listHistory.filter(function(data, index) {
                return data.idUser !== idUser;
            });
            filterHistory.forEach((data, index) => {
                axiosClient.delete(`${ARI_URL}history/${data.id}`).then((res:any) => {
                    localStorage.setItem('loginSuccess', '');
                    localStorage.setItem('cart', '');
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                }).catch((err:any) => {
                    console.log(err);
                })
            });
            state = filterHistory1;
            return state;
        default: return state;
    }
}

export default myReducer;