import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/user';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name : '',
        email: '',
        password: '',
        confirm: ''
    });

    const dispatch = useDispatch();
    const { user } = useSelector( (state) => ({...state}));
    const { name, email, password, confirm} = values;
    const navigate = useNavigate();

    const handleRedirect = () => {
        if(user.isAuthenticated) {
          navigate('/dashboard');
        }
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirm) {
            toast.error('סיסמה ואימות סיסמה אינם זהים!');
        } else{
            const res = await dispatch(signup({name, email, password}));
        }
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" className="form-control" onChange={(e) => onChange(e)} value={name} placeholder="שם מלא" autoFocus />
            <br />
            <input type="text" name="email" className="form-control" onChange={(e) => onChange(e)} value={email} placeholder="אימייל" />
            <br />
            <input type="password" name="password" className="form-control" onChange={(e) => onChange(e)} value={password} placeholder="סיסמה" />
            <br />
            <input type="password" name="confirm" className="form-control" onChange={(e) => onChange(e)} value={confirm} placeholder="אימות סיסמה" />
            <br />
            <button type="submit" className="btn btn-primary">הרשמה</button>
        </form>
    );

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
                    <div className="register-form-container text-center m-auto col-lg-6 col-12 p-5 mt-5">
                        <h1 className="mb-5">הרשמה</h1>
                        {registerForm()}
                    </div>
                </div>
                <Link to="/login" className='auth-link'>התחבר</Link>
                <Link to="/" className='auth-link'>דף הבית</Link>
            </div>
        </>
    );
};

export default Register;