import React from 'react';
import { useSelector } from 'react-redux';

const UpcomingEvents = () => {

    const { events } = useSelector( (state) => ({...state.events}));

    var upcomingEvents = [];
    const now = new Date();

    const sortUpcoming = (event) => {
        var parsedNow = Date.parse(now);
        var eventStart = Date.parse(event.startDate);

        if(eventStart > parsedNow) {
            upcomingEvents.push(event);
        }
    };

    if (events) {
        events.map( sortUpcoming );
    }

    return (
        <div className="card col-lg-2 col-5 text-center m-auto mb-2 p-3" style={{ minHeight: 200, backgroundColor:'#fefefe', borderRadius: '5px'}}>
            <div className="card-body" >
                <h6 className="card-title mb-4">אירועים עתידיים</h6>
                <h1 style={{color: '#673ab7'}}>{upcomingEvents.length}</h1>
            </div>
        </div>
    )
}

export default UpcomingEvents;
