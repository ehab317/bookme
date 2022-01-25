import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password:''
    });
    const {email, password} = values;
    const {user} = useSelector((state) => ({...state}));
    const navigate = useNavigate();

    const handleRedirect = () => {
        if(user.isAuthenticated) {
          navigate('/dashboard');
        }
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={email} className="form-control" placeholder="אימייל" autoFocus onChange={(e) => handleChange(e)} />
            <br />
            <input type="password" name="password" value={password} className="form-control" placeholder="סיסמה" onChange={(e) => handleChange(e)} />
            <br />
            <button type="submit" className="btn btn-primary">התחבר</button>
        </form>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(signin({email, password}));
    }

    useEffect( ()=> {
        handleRedirect();
    });
    
    return (
        <>
            <div className='text-center p-5 div-title'>
            <h1>BookME</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="register-form-container m-auto col-lg-6 col-12 p-5 mt-5 text-center">
                    <h1 className="mb-5">התחברות</h1>
                        {loginForm()}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login