import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SchoolDashboard from './pages/schoolPage/SchoolDashboard';
import BodyContainer from './components/schoolComp/layout/BodyContainer';
import NotFoundPage from './components/NotFoundPage';
import AdminContentBody from './components/adminComp/adminLayout/AdminContentBody';
import AdminDashboard from './components/AdminComp/Dashboard';
import ListTeacher from './pages/schoolPage/teacher/ListTeacher';
import CreateTeacher from './pages/schoolPage/teacher/CreateTeacher';
import ClassDashboard from './pages/schoolPage/class/ClassDashboard';
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='login' element={<LoginPage />} />

        <Route path='admin' element={<AdminContentBody />} >
          <Route index element={<AdminDashboard />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>

        <Route path='school' element={<BodyContainer />}>
          <Route index element={<SchoolDashboard />} />
          <Route path='teacher' element={<ListTeacher />} />
          <Route path='teacher/create' element={<CreateTeacher />} />
          <Route path='class' element={<ClassDashboard />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>


        <Route path='*' element={<NotFoundPage fullscreensize={true} />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
