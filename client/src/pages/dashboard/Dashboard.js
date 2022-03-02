import React, { useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Appbar from '../../components/menus/Appbar';
import { useNavigate } from 'react-router-dom';
import Controls from '../../components/menus/controls';
import { loadBusinesses } from '../../actions/business';
import { loadUnits } from '../../actions/units';
import { loadUserEvents } from '../../actions/events';

const BusinessCount = lazy( () => import('../../components/dashboard/BusinessCount'));
const UnitsCount = lazy( () => import('../../components/dashboard/UnitsCount'));
const UpcomingEvents = lazy( () => import('../../components/dashboard/UpcomingEvents'));
const MonthlyEvents = lazy( () => import('../../components/dashboard/MonthlyEvents'));
const MonthlyEventsList = lazy( () => import('../../components/dashboard/MonthlyEventsList'));

const Dashboard = () => {

    const { user } = useSelector((state) => ({...state}));
    const { menu } = useSelector((state) => ({...state}));
    const collapsed = menu.collapsed;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var id;
    
    if(user.user){
        id = user.user._id;
    };

    const handleRedirect = () => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
    };

    const handleBusinesses = async () => {
        await dispatch(loadBusinesses(id));
    };

    const handleUnits = async () => {
        await dispatch(loadUnits(id));
    };
    
    const handleEvents = async () => {
        await dispatch(loadUserEvents(id));
    };

    useEffect( ()=> {
        handleRedirect();
        handleBusinesses();
        handleUnits();
        handleEvents();
    },[])

    return (
        <>
            <Appbar />
            <div className='flex'>
                { !collapsed ? <Controls /> : null }
                <div className='p-2 text-end w-100 container' style={{minHeight: '92vh'}}>
                    <h2 className='m-4'>לוח בקרה</h2>
                    <div className='row'>
                        <BusinessCount />
                        <UnitsCount />
                        <UpcomingEvents />
                        <MonthlyEvents />
                    </div>
                    <div className='row' style={{direction: 'rtl'}}>
                        <h3>אירועים קרובים:</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr scope="row">
                                    <th scope="col">שם אירוע</th >
                                    <th scope="col">תאריך</th >
                                    <th scope="col">שעת התחלה</th >
                                    <th scope="col">שעת סיום</th >
                                    <th scope="col">עסק</th >
                                    <th scope="col">יחידה</th >
                                </tr>
                            </thead>
                            <tbody>
                                <MonthlyEventsList />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard