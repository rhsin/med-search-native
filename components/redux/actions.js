import axios from 'axios';

export const FETCH_MEDS = 'FETCH_MEDS';
export const FETCH_FIRST_MED = 'FETCH_FIRST_MED';
export const FETCH_MEDS_ERROR = 'FETCH_MEDS_ERROR';
export const SORT_MEDS = 'SORT_MEDS';
export const FILTER_MEDS = 'FILTER_MEDS';

const url = 'http://localhost:8000/';

export function fetchMeds(med) {
    return dispatch => {
        axios.get(url + 'search/' + med)
        .then(res => dispatch({
            type: FETCH_MEDS,
            meds: res.data.data
        }))
        .catch(err => dispatch({
            type: FETCH_MEDS_ERROR,
            error: err.message
        }));
    };
}

export function fetchFirstMed(med) {
    return dispatch => {
        axios.get(url + 'first/' + med)
        .then(res => dispatch({
            type: FETCH_FIRST_MED,
            meds: [res.data.data]
        }))
        .catch(err => dispatch({
            type: FETCH_MEDS_ERROR,
            error: err.message
        }));
    };
}

export const sortMeds = () => ({type: SORT_MEDS});

export const filterMeds = () => ({type: FILTER_MEDS});