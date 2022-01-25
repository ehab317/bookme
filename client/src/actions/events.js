import {API} from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const insertEvent = event => async dispatch => {
    const headers = {
        'content-type' : 'application/json'
    }
    try {
        const res = await axios.post(`${API}/event/insert`, {event}, {headers});
        dispatch({
            type: 'EVENT_CREATED',
            payload: res.data
        });
        toast.success('אירוע הוקם בהצלחה!')
    } catch (error) {
        console.log(error.response);
        toast.error('תקלה ביצירת אירוע חדש. נא לנסות שוב');
    }
};

export const loadEvents = unitId => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
            }
        const res = await axios.post(`${API}/event/load`,{unitId}, {headers});
        dispatch({
            type: 'EVENTS_LOADED',
            payload: res.data
        });
        return res;
    } catch (error) {
        toast.error('תקלה בטעינת אירועים. נא לנסות שוב.');
    }
};

export const loadUserEvents = id => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
            }
        const res = await axios.post(`${API}/event/loadbyuser`,{id}, {headers});
        dispatch({
            type: 'EVENTS_LOADED',
            payload: res.data
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const editEvent = event => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
            }
        const res = await axios.post(`${API}/event/edit`,{event}, {headers});
        return res;
    } catch (error) {
        return error;
    }
};

export const deleteEvent = id => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
        }
        const res = await axios.post(`${API}/event/delete`, {id}, {headers});
        dispatch({
            type: 'EVENT_DELETED',
            payload: res.data
        })
        return res;
    } catch (error) {
        return error;
    }
};