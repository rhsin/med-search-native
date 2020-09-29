import { TestScheduler } from 'jest';
import { initialState, reducer } from '../components/redux/store';
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
} from '../components/redux/actions';

const meds = [
    {id: 1, name: 'Acetamenophen', price: 150},
    {id: 2, name: 'Ibuprofen', price: 250}
];

const user = {name: 'Ryan', email: 'ryan@test.com'};

const error = 'Not Authorized';

describe('reducer', () => {
    test('return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('handle FETCH_MEDS_BEGIN', () => {
        expect(reducer({}, {type: FETCH_MEDS_BEGIN}))
            .toEqual({loading: true, error: null});
    });

    test('handle FETCH_MEDS_SUCCESS', () => {
        expect(reducer({}, {type: FETCH_MEDS_SUCCESS, meds: meds}))
            .toEqual({meds: meds, loading: false});
    });
    
    test('handle FETCH_FIRST_MED', () => {
        expect(reducer({}, {type: FETCH_FIRST_MED, meds: meds}))
            .toEqual({meds: meds, loading: false});
    });

    test('handle FETCH_MEDS_FAILURE', () => {
        expect(reducer({}, {type: FETCH_MEDS_FAILURE, error: error}))
            .toEqual({error: error, loading: false});
    });

    test('handle GET_USER', () => {
        expect(reducer({}, {type: GET_USER, user: user}))
            .toEqual({user: user});
    });

    test('handle SORT_MEDS', () => {
        expect(reducer({meds: meds}, {type: SORT_MEDS}))
            .toEqual({meds: [
                {id: 2, name: 'Ibuprofen', price: 250},
                {id: 1, name: 'Acetamenophen', price: 150}
            ]});
    });

    test('handle FILTER_MEDS', () => {
        expect(reducer({meds: meds}, {type: FILTER_MEDS}))
            .toEqual({meds: [
                {id: 1, name: 'Acetamenophen', price: 150}
            ]});
    });

    test('handle SHOW_ERROR', () => {
        expect(reducer({}, {type: SHOW_ERROR, error: error}))
            .toEqual({error: error});
    });

    test('handle RESET_ERROR', () => {
        expect(reducer({}, {type: RESET_ERROR}))
            .toEqual({error: null});
    });
});