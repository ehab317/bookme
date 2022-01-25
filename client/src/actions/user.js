import axios from 'axios';
import {API} from '../config';
import { toast } from 'react-toastify';


export const signup = user => async dispatch => {
    try {
        const headers = {
            "content-type": "application/json"
        };
        const res = await axios.post(`${API}/user/signup`, user, {headers});
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (error) {
        toast.info(error.response.data);
        dispatch({
            type: 'REGISTER_FAILED'
        });
    }
}

export const signin = user => async dispatch => {
    try {
        const headers = {
            "Content-type": "application/json"
        };
        const res = await axios.post(`${API}/user/signin`, user, {headers});
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (error) {
        toast.info(error.response.data);
    }
}

export const loadUser = token => async dispatch => {
    const headers = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
    const res = await axios.get(`${API}/user/auth`, {headers});
    dispatch({
        type: "USER_LOADED",
        payload: res.data
    })
}

export const logout = () => async dispatch => {
    try {
        const headers = {
            "Content-type": "application/json"
        };
        const res = await axios.post(`${API}/user/signout`, {headers});
        dispatch({
            type: "LOGOUT_SECCESS"
        })
        toast.info(res.data);
        return res.data;
    } catch (error) {
        toast.info(error.response.data);
    }
}