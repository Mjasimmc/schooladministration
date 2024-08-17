import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import UserLoginPage from './UserLoginPage';
import SchoolRegistrationPage from './SchoolRegistrationPage';
import { userSliceSelector, validateUserSession } from '../../../app/slices/userSlice';
import LoadingFullPage from '../../loadingComp/LoadingFullPage';

const BodyContainer = () => {
  const dispatch = useDispatch()
  const { loggedIn, validationStatus } = useSelector(userSliceSelector);
  const [unAuthPage, setUnAuthPage] = useState('login');


  useEffect(() => {
    dispatch(validateUserSession())
  }, [])


  if (validationStatus === 'loading') {
    return <LoadingFullPage />
  }

  if (!loggedIn) {
    if (unAuthPage === 'login') {
      return <UserLoginPage setRegister={setUnAuthPage} />;
    }
    return <SchoolRegistrationPage setLogin={setUnAuthPage} />;
  }

  return (
    <>
      <Sidebar />
      <Header />
      <div
        className='pt-20 lg:ps-56 min-h-screen bg-[#B8D8D8]' // Tailwind CSS classes

      >
        <Outlet />
      </div>
    </>
  );
};

export default BodyContainer;
