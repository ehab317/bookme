import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {

    const { user } = useSelector((state) => ({...state}));
    const navigate = useNavigate();

    const handleRedirect = () => {
        if(user.isAuthenticated) {
          navigate('/dashboard');
        }
    }

    useEffect( ()=> {
        handleRedirect();
    });

    return (
        <>
        <div className='text-center p-5 home-title'>
            <h1>BookME</h1>
            <h3>הדרך המודרנית לנהל הזמנות!</h3>
            <p>BookME היא מערכת מודרנית ופשוטה לשימוש שעוזרת לעסקים קטנים כגדולים לנהל את ההזמנות שלהם בפשטות מירבית!</p>
            <p>המערכת נבנתה בצורה שתוכל להתאים גם לעסקים קטנים, עסקים גדולים ואפילו בעלי מקצוע\מדריכים לנהל את ההזמנות שלהם בלי כאבי ראש מיותרים!</p>
            <br/>
            <h2>לא יכולים לחכות? התחילו עכשיו בלחיצה קטנה אחת!</h2>
        </div>
        <div className='text-center home-link-div'>
            <Link to="/login" className='home-link btn'>התחבר</Link>
            <Link to="/register" className='home-link btn'>הרשם</Link>
        </div>
        </>
    )
}

export default Home