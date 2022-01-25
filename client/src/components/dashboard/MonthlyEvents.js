import React from 'react';
import { useSelector } from 'react-redux';

const MonthlyEvents = () => {

    const { events } = useSelector( (state) => ({...state.events}));

    var monthlyEvents = [];
    const now = new Date();
    const month = now.getMonth()+1;
    const year = now.getFullYear();

    const sortMonthlyEvents = (event) => {
        var eventMonth = event.start.slice(5, 7);
        var parsedEventMonth = parseInt(eventMonth);
        var eventYear = event.startDate.slice(0, 4);
        var parsedEventYear = parseInt(eventYear);

        if(parsedEventYear === year) {
            if( parsedEventMonth === month ) {
                monthlyEvents.push(event);
            };
        };
    };

    if (events) {
        events.map( sortMonthlyEvents);
    }

    return (
        <div className="card col-lg-2 col-5 text-center m-auto mb-2 p-3" style={{ minHeight: 200, backgroundColor:'#fefefe', borderRadius: '5px'}}>
            <div className="card-body" >
                <h6 className="card-title mb-4">אירועים בחודש זה</h6>
                <h1 style={{color: '#673ab7'}}>{monthlyEvents.length}</h1>
            </div>
        </div>
    )
}

export default MonthlyEvents;
