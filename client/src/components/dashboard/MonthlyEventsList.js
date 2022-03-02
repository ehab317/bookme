import React from "react";
import { useSelector } from 'react-redux';

const MonthlyEventsList = () => {

    const { events } = useSelector( (state) => ({...state.events}));
    const { business } = useSelector( (state) => ({...state.business}));
    const { units } = useSelector( (state) => ({...state.units}));
    
    var upcomingEvents = [];
    var parseDatesArr = [];
    var sortedUpcomingEvents = [];
    var listEvents;
    const now = new Date();

    const sortUpcoming = (event) => {
        var parsedNow = Date.parse(now);
        var eventStart = Date.parse(event.startDate);

        if(eventStart > parsedNow) {
            upcomingEvents.push(event);
        }
    };

    const parseDates = (event) => {
        var parsedDate = event.startDate;
        parsedDate = Date.parse(parsedDate);
        parseDatesArr.push(parsedDate);
    }

    const sortDates = () => {
        parseDatesArr.sort( (a, b) => {
            return a - b
        });
    };

    const getSortedEvents = (date) => {
        upcomingEvents.forEach( (event) => {
            var parsedDate = event.startDate;
            parsedDate = Date.parse(parsedDate);
            if (parsedDate == date) {
                sortedUpcomingEvents.push(event);
            }
        })
    };

    if (events) {
        events.map( sortUpcoming );
        upcomingEvents.map( parseDates );
        sortDates();
        parseDatesArr.map( getSortedEvents );
        listEvents = sortedUpcomingEvents.slice(0, 8);
    }

    const showListEvents = (event) => {
        var date = event.startDate.slice(0, 10);
        var startTime = event.start.slice(11, 16);
        var endTime = event.end.slice(11, 16);
        var businessName;
        var unitName;
        business.map( (b) => {
            if ( b._id === event.businessId ){
                businessName = b.name;
            }
        });

        units.map( (u) => {
            if ( u._id === event.unitId ){
                unitName = u.name;
            }
        })

            return(
                <tr scope="row" key={event._id}>
                    <td scope="col">{ event.title }</td>
                    <td scope="col">{ date }</td>
                    <td scope="col">{ startTime == '' ? 'כל היום' : startTime }</td>
                    <td scope="col">{ endTime == '' ? 'כל היום' : endTime }</td>
                    <td scope="col">{ businessName }</td>
                    <td scope="col">{ unitName }</td>
                </tr>
            )
    };

    return(
        <>
        { units && business ? listEvents.map( showListEvents ) : null}
        </>
    )
};

export default MonthlyEventsList;