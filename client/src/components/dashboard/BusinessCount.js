import React from 'react';
import { useSelector } from 'react-redux';

const BusinessCount = () => {

    const { business } = useSelector( (state) => ({...state.business}));
    var businessCount = 0;
    
    if (business) {
        businessCount = business.length;
    }
    
    return (
        <div className="card col-lg-2 col-5 text-center m-auto mb-2 p-3" style={{ minHeight: 200, backgroundColor:'#fefefe', borderRadius: '5px'}}>
            <div className="card-body" >
                <h6 className="card-title mb-4">מספר עסקים קיימים</h6>
                <h1 style={{color: '#673ab7'}}>{businessCount}</h1>
            </div>
        </div>
    )
}

export default BusinessCount;
