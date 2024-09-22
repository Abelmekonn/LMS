"use client";

import React, { useState, useCallback } from 'react';
import {
    HomeOutlined as HomeOutlinedIcon,
    ArrowBackIos as ArrowBackIosIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Category as CategoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    LiveTv as LiveTvIcon,
    Create as CreateIcon,
    HelpOutline as HelpOutlineIcon,
    Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
    const [selected, setSelected] = useState('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleSelect = useCallback((title: string) => {
        setSelected(title);
    }, []);

    const logoutHandler = () => {
        console.log('Logged out');
        // Add logout logic here
    };

    

    return (
        <div className={`h-screen scrollbar-thin scrollbar-thumb-gray-300 flex overflow-y-auto min-h-screen  transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} bg-white shadow-md  scrollbar-thin scrollbar-thumb-gray-300`}>
            <div className="flex flex-col w-full h-full">
                <div className='items-center flex flex-col relative'>
                    <div className="flex items-center justify-between p-4 mb-5">
                        <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>E-Learning</h1>
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`${!isCollapsed ? "absolute  top-0 right-0 mt-5":""}`}>
                            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                        </button>
                    </div>
                    <nav className={`flex flex-col gap-3 mt-4${isCollapsed ? 'h-full' : 'h-[calc(100vh-64px)]'}`}>
                        <Link href="/admin" passHref>
                            <div onClick={() => handleSelect('Dashboard')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Dashboard' ? 'bg-blue-200' : ''}`}>
                                <HomeOutlinedIcon />
                                {!isCollapsed && <span className="ml-2">Dashboard</span>}
                            </div>
                        </Link>
                        <Link href="/admin/create-course" passHref>
                            <div onClick={() => handleSelect('Create Course')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Create Course' ? 'bg-blue-200' : ''}`}>
                                <CreateIcon />
                                {!isCollapsed && <span className="ml-2">Create Course</span>}
                            </div>
                        </Link>
                        <Link href="/admin/live-courses" passHref>
                            <div onClick={() => handleSelect('Live Courses')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Live Courses' ? 'bg-blue-200' : ''}`}>
                                <LiveTvIcon />
                                {!isCollapsed && <span className="ml-2">Live Courses</span>}
                            </div>
                        </Link>
                        <Link href="/admin/course-analytics" passHref>
                            <div onClick={() => handleSelect('Course Analytics')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Course Analytics' ? 'bg-blue-200' : ''}`}>
                                <AnalyticsIcon />
                                {!isCollapsed && <span className="ml-2">Course Analytics</span>}
                            </div>
                        </Link>
                        <Link href="/admin/order-analytics" passHref>
                            <div onClick={() => handleSelect('Order Analytics')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Order Analytics' ? 'bg-blue-200' : ''}`}>
                                <AnalyticsIcon />
                                {!isCollapsed && <span className="ml-2">Order Analytics</span>}
                            </div>
                        </Link>
                        <Link href="/admin/user-analytics" passHref>
                            <div onClick={() => handleSelect('User Analytics')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'User Analytics' ? 'bg-blue-200' : ''}`}>
                                <AnalyticsIcon />
                                {!isCollapsed && <span className="ml-2">User Analytics</span>}
                            </div>
                        </Link>
                        <Link href="/admin/manage-team" passHref>
                            <div onClick={() => handleSelect('Manage Team')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Manage Team' ? 'bg-blue-200' : ''}`}>
                                <PeopleIcon />
                                {!isCollapsed && <span className="ml-2">Manage Team</span>}
                            </div>
                        </Link>
                        <Link href="/admin/categories" passHref>
                            <div onClick={() => handleSelect('Categories')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Categories' ? 'bg-blue-200' : ''}`}>
                                <CategoryIcon />
                                {!isCollapsed && <span className="ml-2">Categories</span>}
                            </div>
                        </Link>
                        <Link href="/admin/settings" passHref>
                            <div onClick={() => handleSelect('Settings')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100 ${selected === 'Settings' ? 'bg-blue-200' : ''}`}>
                                <SettingsIcon />
                                {!isCollapsed && <span className="ml-2">Settings</span>}
                            </div>
                        </Link>
                        <Link href="#" passHref>
                            <div onClick={logoutHandler} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-100`}>
                                <LogoutIcon />
                                {!isCollapsed && <span className="ml-2">Logout</span>}
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
