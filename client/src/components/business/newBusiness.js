import React, {useState} from 'react';
import './business.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {insertBusinesses} from '../../actions/business';

const NewBusiness = () => {

    const [values, setValues] = useState({
        name: '',
        description:'',
        hasCategories: false,
        html: false
    });
    const {name, description, hasCategories, html} = values;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state}));
    var userID;
    if (user.user) {
        userID = user.user._id;
    } else {
        userID = '';
    };
    
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleChecked = (e) => {
        setValues({...values, [e.target.name]: e.target.checked});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('חובה להזין שם עסק');
            return;
        };
        const res = await dispatch(insertBusinesses({name, description, hasCategories, userID}));
        setValues({html: false})
    };
    
    const handleForm = () => {
        return (
            <div className='Business-form-layout'>
                <div className='form-container m-auto p-lg-5 p-3'>
                    <h3>הקמת עסק חדש</h3>
                    <form onSubmit={handleSubmit}>
                        <h5 className='text-end'>שם העסק</h5>
                        <input type="text" name="name" className="form-control" placeholder="שם העסק" autoFocus onChange={(e) => handleChange(e)} />
                        <br />
                        <h5 className='text-end'>תאור העסק</h5>
                        <textarea rows="3" name="description" className="form-control" placeholder="תאור העסק" onChange={(e) => handleChange(e)} />
                        <br />
                        <input type="checkbox" name="hasCategories" id="hasCategories" onChange={(e) => handleChecked(e)}/>
                        <label htmlFor="hasCategories"> לנהל קטגוריות</label>
                        <br/>
                        <div className='row'>
                        <button type="submit" className="btn btn-primary m-auto col-6 mt-4 w-25">שמור</button>
                        <button type="button" className="btn btn-primary m-auto col-6 mt-4 w-25" onClick={()=>setValues({html : false})}>סגור</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    return (
        <>
       <div className="card col-lg-2 col-md-8 col-10 text-center m-lg-2 m-auto" style={{ height: 250, cursor: 'pointer'}} onClick={()=>setValues({html: true})}>
            <div className="card-body">
                <h3 className="card-title">הוסף חדש</h3>
                <p className="m-5" style={{fontSize:'36px'}}><i className="fas fa-plus"></i></p>
            </div>
        </div>
        <div className='row'>
        {html ? handleForm() : null}
        </div>
        </>
    )
}

export default NewBusiness;
