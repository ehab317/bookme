import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/user';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Businesses = lazy(() => import('./pages/dashboard/Businesses'));
const Units = lazy(() => import('./pages/dashboard/Units'));
const Calendar = lazy(() => import('./pages/calendar/Calendar'));
const BusinessUnits = lazy(()=> import('./pages/dashboard/BusinessUnits'));

const App = () => {

  const dispatch = useDispatch();

  useEffect( () => {
    var token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser(token));
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer rtl />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/units" element={<Units />} />
          <Route path="/business/units/:businessId" element={<BusinessUnits />} />
          <Route path="/calendar/:daily/:unitId/:businessId/:userId" element={<Calendar />} />
      </Routes>
    </Suspense>
  )
}

export default App;
