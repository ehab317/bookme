import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { loadBusinesses, deleteBusiness } from '../../actions/business';
import Appbar from '../../components/menus/Appbar';
import Controls from '../../components/menus/controls';
import { useNavigate } from 'react-router-dom';
import NewBusiness from '../../components/business/newBusiness';
import { Link } from 'react-router-dom';

const Businesses = () => {

    const { menu } = useSelector((state) => ({...state}));
    const { user } = useSelector((state) => ({...state}));
    const { business } = useSelector((state) => ({...state}));
    const collapsed = menu.collapsed;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm('האם אתה בטוח שברצונך להסיר עסק זה?')) {
            await dispatch(deleteBusiness(id));
        };
    };

    const handleBusinesses = async () => {
        await dispatch(loadBusinesses(user.user._id));
    };

    const RenderBusiness = (business) => {

        const id = business._id;
        
        return (
            <div className="card col-lg-2 col-md-8 col-10 text-center m-lg-2 m-auto mb-1" style={{ minHeight: 250, backgroundColor:'#fefefe'}} key={id}>
                <div className="card-body" >
                    <h5 className="card-title">{business.name}</h5>
                    <hr/>
                    <h6 className="card-subtitle mb-2 text-muted">{business.description}</h6>
                    {/* to do */}
                    {/* <p className="card-text">{ business.hasCategories ? 'מנהל קטגוריות' : 'ללא קטגוריות'}</p> */} 
                    <Link to={{pathname:`/business/units/${id}`}} className="btn btn-primary m-2">ניהול</Link>
                    <button type="button" className="btn btn-danger m-2" onClick={() => handleDelete(id)}>מחק</button>
                </div>
            </div>
        )
    };

    const getBusinesses = () => {
        if(business.business){
            var myBusinesses = business.business;
            return myBusinesses.map( RenderBusiness )
        }
    };


    const handleRedirect = () => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
    }

    useEffect( ()=> {
        handleRedirect();
        handleBusinesses();
    },[])

    return (
        <>
            <Appbar />
            <div className='flex'>
            { !collapsed ? <Controls /> : null }
            <div className='p-2 text-end w-100 container' style={{minHeight: '92vh'}}>
                    <h2 className='m-4'>רשימת עסקים</h2>
                    <div className='row'>
                    {getBusinesses()}
                    <NewBusiness />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Businesses;