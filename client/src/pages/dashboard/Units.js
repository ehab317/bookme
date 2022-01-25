import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Appbar from '../../components/menus/Appbar';
import Controls from '../../components/menus/controls';
import { useNavigate, Link } from 'react-router-dom';
import { loadBusinesses } from '../../actions/business';
import { loadUnits } from '../../actions/units';
import { deleteUnit } from '../../actions/units';
import CreateUnit from '../../components/units/createUnit';

const Units = () => {

    const { menu } = useSelector((state) => ({...state}));
    const { user } = useSelector((state) => ({...state}));
    const { business } = useSelector((state) => ({...state.business}));
    const { units } = useSelector((state) => ({...state.units}));
    const collapsed = menu.collapsed;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirect = () => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
    }

    const handleBusinesses = async () => {
        await dispatch(loadBusinesses(user.user._id));
    };

    const handleUnits = async () => {
        await dispatch(loadUnits(user.user._id));
    };

    const renderUnits = (b) => {
        var businessUnits = [];
        units.forEach(unit => {
            if( unit.businessId == b._id) {
                businessUnits.push(unit);
            }
        });
        return (
            <div  key={b._id}>
                <h4 className='border-bottom border-secondary'>{b.name}</h4>
                <div className='row'>
                    {businessUnits.map( showUnits )}
                    < CreateUnit businessId={b._id} />
                </div>
            </div>
        )
    };

    const handleDelete = async (id) => {
        if (window.confirm('האם אתה בטוח שברצונך להסיר יחידה זאת?')) {
            await dispatch(deleteUnit(id));
        };
    };

    const showUnits = (unit) => {
        return (
            <div className="card col-lg-2 col-10 text-center m-lg-2 m-auto mb-1" style={{ minHeight: 250, backgroundColor:'#fefefe'}} key={unit._id}>
                <div className="card-body" >
                    <h5 className="card-title">{unit.name}</h5>
                    <hr/>
                    <h6 className="card-subtitle mb-2 text-muted">{unit.description}</h6>
                    <p className="card-text">{ unit.daily ? 'תצוגה יומית' : 'תצוגה חודשית'}</p>
                    <Link to={`/calendar/${unit.daily}/${unit._id}/${unit.businessId}/${unit.userID}`} className="btn btn-primary m-2">ניהול</Link>
                    <button type="button" className="btn btn-danger m-2" onClick={() => handleDelete(unit._id)}>מחק</button>
                </div>
            </div>
        )
    };

    useEffect( ()=> {
        handleRedirect();
        handleBusinesses();
        handleUnits();
    },[])

    return (
        <>
            <Appbar />
            <div className='flex'>
            { !collapsed ? <Controls /> : null }
                <div className='p-2 text-end w-100 container' style={{minHeight: '92vh'}}>
                    <h2 className='m-4'>רשימת יחידות</h2>
                    { units && business ? business.map(renderUnits) : null}
                </div>
            </div>
        </>
    )
};

export default Units;