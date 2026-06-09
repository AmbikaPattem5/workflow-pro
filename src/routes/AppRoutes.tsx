import {Routes, Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Projects from '../pages/Projects/Projects';
import NotFound from '../pages/NotFound/NotFound';

import MainLayout from '../layouts/MainLayout';

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<MainLayout><Dashboard/></MainLayout>}/>
            <Route path="/projects" element={<MainLayout><Projects/></MainLayout>}/>
            <Route path="/profile" element={<MainLayout><Profile/></MainLayout>}/>
            <Route path="*" element={<MainLayout><NotFound/></MainLayout>}/>
        </Routes>
    );

}

export default AppRoutes;