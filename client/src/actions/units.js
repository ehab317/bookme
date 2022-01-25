import {API} from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const loadUnits = id => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
            }
        const res = await axios.post(`${API}/units/load`,{id}, {headers});
        dispatch({
            type: 'UNITS_LOADED',
            payload: res.data.units
        });
        return res;
    } catch (error) {
        toast.error(error.response.data);
    }
};

export const loadBusinessUnits = businessID => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
        }
        const res = await axios.post(`${API}/business/units/load`, {businessID}, {headers});
        dispatch({
            type : 'UNITS_LOADED',
            payload: res.data.units
        });
        return res;
    } catch (error) {
        toast.error(error.response.data);
    }
};

export const insertUnit = unit => async dispatch => {
    const headers = {
        'content-type' : 'application/json'
    }
    try {
        const res = await axios.post(`${API}/unit/insert`, {unit}, {headers});
        dispatch({
            type: 'UNIT_CREATED',
            payload: res.data
        });
    } catch (error) {
        toast.error('תקלה ביצירת יחידה חדשה. נא לנסות שוב');
    }
};

export const deleteUnit = id => async dispatch => {
    const headers = {
        'content-type' : 'application/json'
    }
    try {
        const res = await axios.post(`${API}/unit/delete`, {id}, {headers});
        dispatch({
            type: 'UNIT_DELETED',
            payload: res.data
        });
    } catch (error) {
        toast.error('תקלה בהסרת עסק. נא לנסות שוב');
    }
};