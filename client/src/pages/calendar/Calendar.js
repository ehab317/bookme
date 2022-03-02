import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Appbar from '../../components/menus/Appbar';
import Controls from '../../components/menus/controls';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router-dom';
import './calendar.css';
import { toast } from 'react-toastify';
import { insertEvent, loadEvents, editEvent, deleteEvent } from '../../actions/events';

const MonthlyCalendar = () => {

    const [values, setValues] = useState({
        startStr: '',
        endStr:'',
        startDate: '',
        endDate: '',
        title:'',
        daily: useParams().daily,
        unitId: useParams().unitId,
        businessId: useParams().businessId,
        userId: useParams().userId,
        html: false,
        weeklyHtml: false,
        editHtml: false,
        weeklyEditHtml: false,
        idToEdit:''
    });
    const dispatch = useDispatch();
    const {  menu } = useSelector((state) => ({...state}));
    const {  events } = useSelector((state) => ({...state}));
    const { title, startStr, endStr, businessId, userId, unitId, html, editHtml, idToEdit, daily, weeklyEditHtml, weeklyHtml, startDate, endDate } = values;
    const collapsed = menu.collapsed;

    const getEvents = async () => {
        const res = await dispatch(loadEvents(unitId));
    };

    const handleSelect = (info) => {
        setValues({...values, startStr: info.startStr, endStr: info.endStr, title: '', startDate: info.start, endDate: info.end, html: true});
    };

    const handleWeeklySelect = (info) => {
        setValues({...values, startStr: info.startStr, endStr: info.endStr, title: '', startDate: info.start, endDate: info.end, weeklyHtml: true});
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleDateChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userId){
            toast.error('משתמש לא זוהה');
            return;
        }
        if(!businessId) {
            toast.error('עסק לא זוהה');
            return;
        }
        if(!title) {
            toast.error('חובה להגדיר שם לאירוע!');
            return;
        }
        const res = await dispatch(insertEvent({title, startStr, endStr, unitId, businessId, startDate, endDate, userId}));
        setValues({...values, html : false, weeklyHtml: false});
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if(!userId){
            toast.error('משתמש לא זוהה');
            return;
        }
        if(!businessId) {
            toast.error('עסק לא זוהה');
            return;
        }
        const res = await dispatch(editEvent({title, startStr, endStr, startDate, endDate, idToEdit}));
        getEvents();
        setValues({...values, editHtml : false, weeklyEditHtml:false});
        toast.success('אירוע נערך בהצלחה!');
    };

    const handleDelete = async () => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק אירוע זה?')){
            const res = await dispatch(deleteEvent(idToEdit));
            setValues({...values, editHtml : false, weeklyEditHtml:false});
            toast.success('אירוע נמחק בהצלחה!');
        }
    };

    const handleForm = () => {
        return(
            <div className='event-form-layout'>
                <div className='form-container m-auto p-5'>
                <h3 className="text-center mb-4">הוסף אירוע</h3>
                    <form onSubmit={handleSubmit}>
                        <h5 className='text-end'>מיום:</h5>
                        <input type="date" name="startStr" className="form-control" defaultValue={values.startStr} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>עד יום:</h5>
                        <input type="date" name="endStr" className="form-control" defaultValue={values.endStr} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>כותרת:</h5>
                        <input type="text" name="title" className="form-control" defaultValue={values.title} onChange={(e) => handleChange(e)} autoFocus />
                        <br />
                        <div className='row'>
                            <button type="submit" className="btn btn-primary col-4 m-auto" >שמור</button>
                            <button type="button" className="btn btn-primary col-4 m-auto" onClick={()=>setValues({...values, html : false})}>סגור</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    const handleWeeklyForm = () => {
        return(
            <div className='event-form-layout'>
                <div className='form-container m-auto p-5'>
                <h3 className="text-center mb-4">הוסף אירוע</h3>
                    <form onSubmit={handleSubmit}>
                        <h5 className='text-end'>מיום:</h5>
                        <input type="datetime-local" name="startStr" className="form-control" defaultValue={values.startStr.slice(0, 16)} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>עד יום:</h5>
                        <input type="datetime-local" name="endStr" className="form-control" defaultValue={values.endStr.slice(0, 16)} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>כותרת:</h5>
                        <input type="text" name="title" className="form-control" defaultValue={values.title} onChange={(e) => handleChange(e)} autoFocus />
                        <br />
                        <div className='row'>
                            <button type="submit" className="btn btn-primary col-4 m-auto" >שמור</button>
                            <button type="button" className="btn btn-primary col-4 m-auto" onClick={()=>setValues({...values, weeklyHtml : false})}>סגור</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    const handleEditForm = () => {
        return(
            <div className='event-form-layout'>
                <div className='form-container m-auto p-5'>
                    <h3 className="text-center mb-4">ערוך אירוע</h3>
                    <form onSubmit={handleEditSubmit} >
                        <h5 className='text-end'>מיום:</h5>
                        <input type="date" name="startStr" className="form-control" defaultValue={values.startStr} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>עד יום:</h5>
                        <input type="date" name="endStr" className="form-control" defaultValue={values.endStr} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>כותרת:</h5>
                        <input type="text" name="title" className="form-control" defaultValue={values.title} onChange={(e) => handleChange(e)} autoFocus />
                        <br />
                        <div className='row'>
                            <button type="submit" className="btn btn-primary col-4 m-auto" >שמור</button>
                            <button type="button" className="btn btn-primary col-4 m-auto" onClick={()=>setValues({...values, editHtml : false})}>סגור</button>
                            <button type="button" className="btn btn-danger col-10 m-auto mt-2" onClick={() => handleDelete()}>מחק</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    const handleWeeklyEditForm = () => {
        return(
            <div className='event-form-layout'>
                <div className='form-container m-auto p-5'>
                    <h3 className="text-center mb-4">ערוך אירוע</h3>
                    <form onSubmit={handleEditSubmit} >
                        <h5 className='text-end'>מיום:</h5>
                        <input type="datetime-local" name="startStr" className="form-control" defaultValue={values.startStr.slice(0, 16)} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>עד יום:</h5>
                        <input type="datetime-local" name="endStr" className="form-control" defaultValue={values.endStr.slice(0,16)} onChange={(e) => handleDateChange(e)}/>
                        <br />
                        <h5 className='text-end'>כותרת:</h5>
                        <input type="text" name="title" className="form-control" defaultValue={values.title} onChange={(e) => handleChange(e)} autoFocus />
                        <br />
                        <div className='row'>
                            <button type="submit" className="btn btn-primary col-4 m-auto" >שמור</button>
                            <button type="button" className="btn btn-primary col-4 m-auto" onClick={()=>setValues({...values, weeklyEditHtml : false})}>סגור</button>
                            <button type="button" className="btn btn-danger col-10 m-auto mt-2" onClick={() => handleDelete()}>מחק</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    const handleMonthlyEventClick = (event) => {
        const eventId = event.event._def.extendedProps._id;
        const selectedEvent = events.events.filter((target) => {
            return target._id == eventId;
        });
        setValues({...values, startStr: selectedEvent[0].start , endStr: selectedEvent[0].end, title: selectedEvent[0].title, idToEdit: eventId, editHtml: true});
    };

    const handleWeeklyEventClick = (event) => {
        const eventId = event.event._def.extendedProps._id;
        const selectedEvent = events.events.filter((target) => {
            return target._id == eventId;
        });
        setValues({...values, startStr: selectedEvent[0].start , endStr: selectedEvent[0].end, startDate: selectedEvent[0].startDate, endDate: selectedEvent[0].endDate, title: selectedEvent[0].title, idToEdit: eventId, weeklyEditHtml: true});
    };

    useEffect(() => {
        getEvents();
    }, []);


    return (
        <>
        <Appbar />
            <div className='flex'>
                { !collapsed ? <Controls /> : "" }
                <div className='p-2 text-end w-100 container' style={{minHeight: '92vh'}}>
                    <h2 className='m-4'>תצוגה חודשית</h2>
                    {daily === 'false' ? 
                    <div><input type="button" value="הוסף" className='btn btn-primary m-1' onClick={()=>setValues({...values, html : true})}/></div> :
                    <div><input type="button" value="הוסף" className='btn btn-primary m-1' onClick={()=>setValues({...values, weeklyHtml : true})}/></div> }
                    <div className='row'></div>
                    { daily === 'false' ?
                    <FullCalendar plugins={[ dayGridPlugin, interactionPlugin  ]} events={events.events} selectable='true' eventClick={ (event) => handleMonthlyEventClick(event)} select={(info) => handleSelect(info)} initialView="dayGridMonth" /> :
                    <FullCalendar plugins={[ timeGridPlugin, interactionPlugin  ]} slotLabelFormat={{ hour: 'numeric',minute: '2-digit', hour12: false}} eventTimeFormat={{hour: '2-digit',minute: '2-digit',hour12: false}} events={events.events} selectable='true' eventClick={ (event) => handleWeeklyEventClick(event)} select={(info) => handleWeeklySelect(info)} initialView="timeGridWeek" /> }
                </div>
            </div>
            {html ? handleForm() : null}
            {weeklyHtml ? handleWeeklyForm() : null}
            {editHtml ? handleEditForm() : null}
            {weeklyEditHtml ? handleWeeklyEditForm() : null}
        </>
    )
};

export default MonthlyCalendar;

