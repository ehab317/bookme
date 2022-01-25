import React from 'react';
import { useSelector } from 'react-redux';

const UnitsCount = () => {

    const { units } = useSelector( (state) => ({...state.units}));
    var unitsCount = 0;
    
    const getBusinessCount = () => {
        if (units) {
            unitsCount = units.length;
        }
    };
    
    getBusinessCount();
    return (
        <div className="card col-lg-2 col-5 text-center m-auto mb-2 p-3" style={{ minHeight: 200, backgroundColor:'#fefefe', borderRadius: '5px'}}>
            <div className="card-body" >
                <h6 className="card-title mb-4">מספר יחידות קיימות</h6>
                <h1 style={{color: '#673ab7'}}>{unitsCount}</h1>
            </div>
        </div>
    )
}

export default UnitsCount;
