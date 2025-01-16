import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import Main_Screen from './layouts/mainLayout';
import Login_Page from './pages/login';
import Home_Page from './pages/home';
import Profile_Page from './pages/profile';
import Projects_Page from './pages/projects';
import Communities_Page from './pages/communities';

const AppRoutes = () => {
    return (
        <Router basename='/netwise'>
            <Routes>
                <Route path="/login" element={<Login_Page />} />
                <Route element={<Main_Screen/>}>
                    <Route path="/home" element={<Home_Page />} />

                    <Route path="/profile" element={<Profile_Page />} />
                    <Route path="/profile/:id" element={<Profile_Page />} />

                    <Route path="/projects/:id" element={<Projects_Page />} />

                    <Route path="/communities/:id" element={<Communities_Page />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;