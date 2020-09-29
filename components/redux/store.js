import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { orderBy } from 'lodash';
import {
    FETCH_MEDS_BEGIN,
    FETCH_MEDS_SUCCESS,
    FETCH_FIRST_MED,
    FETCH_MEDS_FAILURE,
    GET_USER,
    SORT_MEDS,
    FILTER_MEDS,
    SHOW_ERROR,
    RESET_ERROR
} from './actions';

export const initialState = {
    meds: [],
    user: null,
    loading: false,
    error: null
};

export function reducer(state = initialState, action) {
    console.log('reducer', state, action);

    switch(action.type) {
        case FETCH_MEDS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_MEDS_SUCCESS:
            return {
                ...state,
                meds: action.meds,
                loading: false
            };
        case FETCH_FIRST_MED:
            return {
                ...state,
                meds: action.meds,
                loading: false
            };
        case FETCH_MEDS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.user
            };
        case SORT_MEDS:
            return { 
                ...state,
                meds: orderBy(state.meds.slice(), 'price', 'desc')
            };
        case FILTER_MEDS:
            return { 
                ...state,
                meds: state.meds.slice().filter(item => item.price < 200)
            };
        case SHOW_ERROR:
            return {
                ...state,
                error: action.error
            };
        case RESET_ERROR:
            return {
                ...state,
                error: null
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


  