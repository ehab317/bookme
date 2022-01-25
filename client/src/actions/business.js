import {API} from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const loadBusinesses = id => async dispatch => {
    try {
        const headers = {
            'content-type' : 'application/json'
            }
        const res = await axios.post(`${API}/business/load`,{id}, {headers});
        dispatch({
            type: 'BUSINESSES_LOADED',
            payload: res.data.businesses
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const insertBusinesses = business => async dispatch => {
    const headers = {
        'content-type' : 'application/json'
    }
    try {
        const res = await axios.post(`${API}/business/insert`, {business}, {headers});
        dispatch({
            type: 'BUSINESS_CREATED',
            payload: res.data
        });
    } catch (error) {
        toast.error('תקלה ביצירת עסק חדש. נא לנסות שוב');
    }
};

export const deleteBusiness = id => async dispatch => {
    const headers = {
        'content-type' : 'application/json'
    }
    try {
        const res = await axios.post(`${API}/business/delete`, {id}, {headers});
        dispatch({
            type: 'BUSINESS_DELETED',
            payload: res.data
        });
    } catch (error) {
        toast.error('תקלה בהסרת עסק. נא לנסות שוב');
    }
};