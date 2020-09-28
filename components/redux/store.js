import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { orderBy } from 'lodash';

export const initialState = {
    meds: [],
    error: null
};

export function reducer(state = initialState, action) {
    console.log('reducer', state, action);

    switch(action.type) {
        case 'FETCH_MEDS':
            return {
                ...state,
                meds: action.meds
            };
        case 'FETCH_FIRST_MED':
            return {
                ...state,
                meds: action.meds
            };
        case 'FETCH_MEDS_ERROR':
            return {
                ...state,
                error: action.error
            };
        case 'SORT_MEDS':
            return { 
                ...state,
                meds: orderBy(state.meds.slice(), 'price', 'desc')
            };
        case 'FILTER_MEDS':
            return { 
                ...state,
                meds: state.meds.slice().filter(item => item.price < 200)
            };
        default:
            return state;
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;


  