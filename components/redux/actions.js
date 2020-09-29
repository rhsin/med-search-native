import axios from 'axios';

export const FETCH_MEDS_BEGIN = 'FETCH_MEDS_BEGIN';
export const FETCH_MEDS_SUCCESS = 'FETCH_MEDS_SUCCESS';
export const FETCH_FIRST_MED = 'FETCH_FIRST_MED';
export const FETCH_MEDS_FAILURE = 'FETCH_MEDS_FAILURE';
export const GET_USER = 'GET_USER';
export const SORT_MEDS = 'SORT_MEDS';
export const FILTER_MEDS = 'FILTER_MEDS';
export const SHOW_ERROR = 'SHOW_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

const url = 'http://localhost:8000/';

export function fetchMeds(med) {
    return dispatch => {
        dispatch({type: FETCH_MEDS_BEGIN});
        axios.get(url + 'search/' + med)
        .then(res => dispatch({
            type: FETCH_MEDS_SUCCESS,
            meds: res.data.data
        }))
        .catch(err => dispatch({
            type: FETCH_MEDS_FAILURE,
            error: err.message
        }));
    };
}

export function fetchFirstMed(med) {
    return dispatch => {
        dispatch({type: FETCH_MEDS_BEGIN});
        axios.get(url + 'first/' + med)
        .then(res => dispatch({
            type: FETCH_FIRST_MED,
            meds: [res.data.data]
        }))
        .catch(err => dispatch({
            type: FETCH_MEDS_FAILURE,
            error: err.message
        }));
    };
}

export function getUser() {
    return dispatch => {
        axios.get(url + 'users')
        .then(res => dispatch({
            type: GET_USER,
            user: res.data.data[0]
        }))
        .catch(err => console.log(err));
    };
}

export const sortMeds = () => ({type: SORT_MEDS});

export const filterMeds = () => ({type: FILTER_MEDS});

export const showError = (err) => ({type: SHOW_ERROR, error: err.message});

export const resetError = () => ({type: RESET_ERROR});