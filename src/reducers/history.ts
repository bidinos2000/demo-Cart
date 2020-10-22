import * as types from './../constants/actionTypes';

const initialState: Array<DataHistory> = [];


const myReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case types.GET_HISTORY_USER:
            let idUser = localStorage.getItem('id');
            let listHistory: Array<DataHistory> = action.data;
            let newlistHistory:Array<DataHistory> = [];
            listHistory.forEach((data:DataHistory, index: number) => {
                if(data.idUser === idUser) {
                   newlistHistory.push(data);
                }
            });
            localStorage.setItem('history', JSON.stringify(newlistHistory));
            state = newlistHistory;
            return state;
        default: return state;
    }
}

export default myReducer;