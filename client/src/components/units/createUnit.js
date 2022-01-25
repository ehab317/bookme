import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { insertUnit } from '../../actions/units';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../business/business.css';

const CreateUnit = (id) => {

    const [values, setValues] = useState({
        name: '',
        daily: false,
        description: '',
        html: false
    });

    const { name, daily, description, html} = values;
    const dispatch = useDispatch();
    const { businessId } = id;
    const { user } = useSelector((state) => ({...state}));
    var userID = null;

    if (user.user){
        userID = user.user._id;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('חובה להזין שם יחידה');
            return;
        };
        const res = await dispatch(insertUnit({name, description, daily, businessId,  userID}));
        setValues({html: false});
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleChecked = (e) => {
        setValues({...values, [e.target.name]: e.target.checked});
    };

    const handleForm = () => {
        return (
            <div className='Business-form-layout' style={{zIndex:'9'}}>
            <div className='form-container m-auto p-5'>
                <h3>הקמת יחידה חדשה</h3>
                <form onSubmit={handleSubmit}>
                    <h5 className='text-end'>שם היחידה</h5>
                    <input type="text" name="name" className="form-control" placeholder="שם היחידה" autoFocus onChange={(e) => handleChange(e)} />
                    <br />
                    <h5 className='text-end'>תאור היחידה</h5>
                    <textarea rows="3" name="description" className="form-control" placeholder="תאור היחידה" onChange={(e) => handleChange(e)} />
                    <br />
                    <input type="checkbox" name="daily" id="daily" onChange={(e) => handleChecked(e)}/>
                    <label htmlFor="daily">ניהול יומי</label>
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
            <div className="card col-lg-2 col-10 text-center m-lg-2 m-auto mb-1" style={{ height: 250, cursor: 'pointer'}} onClick={()=>setValues({html: true})}>
                <div className="card-body">
                    <h3 className="card-title">הוסף חדש</h3>
                    <p className="m-5" style={{fontSize:'36px'}}><i className="fas fa-plus"></i></p>
                </div>
            </div>
            {html ? handleForm() : null}
        </>
    )

}

export default CreateUnit;
