import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Appbar from "../../components/menus/Appbar";
import Controls from "../../components/menus/controls";
import { loadBusinessUnits, deleteUnit } from '../../actions/units';
import NewUnit from "../../components/units/newUnit";

const BusinessUnits = () => {

    const { menu } = useSelector((state) => ({...state}));
    const { user } = useSelector((state) => ({...state}));
    const { units } = useSelector((state) => ({...state}));

    const collapsed = menu.collapsed;
    const { businessId } = useParams();
    const userId = user.user._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getBusinessUnits = async () => {
        await dispatch(loadBusinessUnits(businessId));
    };

    const getUnits = () => {
        if(units.units){
            var myUnits = units.units;
            return myUnits.map( RenderUnits );
        }
    };

    const RenderUnits = (unit) => {

        const id = unit._id;
        const daily = unit.daily;
        
        return (
            <div className="card col-lg-2 col-10 text-center m-lg-2 m-auto mb-1" style={{ minHeight: 250, backgroundColor:'#fefefe'}} key={id}>
                <div className="card-body" >
                    <h5 className="card-title">{unit.name}</h5>
                    <hr/>
                    <h6 className="card-subtitle mb-2 text-muted">{unit.description}</h6>
                    <p className="card-text">{ unit.daily ? 'תצוגה יומית' : 'תצוגה חודשית'}</p>
                    <Link to={`/calendar/${daily}/${id}/${businessId}/${userId}`} className="btn btn-primary m-2">ניהול</Link>
                    <button type="button" className="btn btn-danger m-2" onClick={() => handleDelete(id)}>מחק</button>
                </div>
            </div>
        )
    };

    const handleDelete = async (id) => {
        if (window.confirm('האם אתה בטוח שברצונך להסיר יחידה זאת?')) {
            await dispatch(deleteUnit(id));
        };
    };

    const handleRedirect = () => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
    };

    useEffect( ()=> {
        handleRedirect();
        getBusinessUnits();
    },[])

    return (
        <>
            <Appbar />
            <div className='flex'>
            { !collapsed ? <Controls /> : null }
            <div className='p-2 text-end w-100 container' style={{minHeight: '92vh'}}>
            <h2 className='m-4'>יחידות לעסק</h2>
            <div className="row">
            {getUnits()}
                <NewUnit />
            </div>
                </div>
            </div>
        </>
    )
};

export default BusinessUnits;