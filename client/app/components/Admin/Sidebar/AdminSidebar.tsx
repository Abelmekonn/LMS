"use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaUsers } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { LiaPagerSolid } from "react-icons/lia";
import QuizIcon from '@mui/icons-material/Quiz';
import { TbReportAnalytics } from "react-icons/tb";

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
import toast from 'react-hot-toast';

type Props = {
    user: any;
};


const AdminSidebar: React.FC<Props> = ({ user }) => {
    const [selected, setSelected] = useState('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleSelect = useCallback((title: string) => {
        setSelected(title);
    }, []);

    const logoutHandler = () => {
        toast.success('Logged out')
    };

    return (
        <div className={`h-screen scrollbar-thin absolute z-50 md:relative scrollbar-thumb-gray-300 flex overflow-y-auto min-h-screen  transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[210px]'} bg-white dark:bg-gray-800 shadow-md  scrollbar-thin scrollbar-thumb-gray-300`}>
            <div className="flex flex-col w-full dark:text-white text-black h-full">
                <div className='items-center flex flex-col  '>
                    <div className={`mt-5 w-full flex items-center gap-5  mb-5 ${isCollapsed ? 'justify-center ' : 'justify-center'}`}>
                        <h1 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>
                            <Link href={'/'}>E-Learning</Link>
                        </h1>
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className={`${!isCollapsed ? " " : ""}`}>
                            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                        </button>
                    </div>
                    <div className={`flex flex-col items-center justify-between mb-5 transition-all ease-in-out duration-100 ${isCollapsed ? 'hidden' : 'block'}`}>
                        <div className="w-[100px] h-[100px] border-4 border-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                            <Image
                                src={user.avatar.url}
                                alt="Admin Avatar"
                                className="object-cover cursor-pointer"
                                width={100} // Match the container size
                                height={100} // Match the container size
                            />
                        </div>
                        <h1 className='text-2xl'>
                            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                        </h1>
                        <span>
                            - {user.role}
                        </span>

                    </div>
                    <nav className={`flex flex-col gap-3 mt-4${isCollapsed ? 'h-full' : 'h-[calc(100vh-64px)]'}`}>
                        <Link href="/admin" passHref>
                            <div onClick={() => handleSelect('Dashboard')} className={`flex items-center p-2 mb-2 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Dashboard' ? 'text-blue-500 text-black' : ''}`}>
                                <HomeOutlinedIcon />
                                {!isCollapsed && <span className="ml-2">Dashboard</span>}
                            </div>
                        </Link>
                        <div >
                            {!isCollapsed && <span className=''>Data</span>}
                            <Link href="/admin/users" passHref>
                                <div onClick={() => handleSelect('Users')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Users' ? 'text-blue-500' : ''}`}>
                                    <FaUsers size={20} />
                                    {!isCollapsed && <span className="ml-2">Users</span>}
                                </div>
                            </Link>
                            <Link href="/admin/invoice" passHref>
                                <div onClick={() => handleSelect('Invoice')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Invoice' ? 'text-blue-500' : ''}`}>
                                    <LiaFileInvoiceSolid size={20} />
                                    {!isCollapsed && <span className="ml-2">Invoice</span>}
                                </div>
                            </Link>
                        </div>
                        <div>
                            {!isCollapsed && <span>Courses</span>}
                            <Link href="/admin/create-course" passHref>
                                <div onClick={() => handleSelect('Create Course')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Create Course' ? 'text-blue-500' : ''}`}>
                                    <CreateIcon />
                                    {!isCollapsed && <span className="ml-2">Create Course</span>}
                                </div>
                            </Link>
                            <Link href="/admin/courses" passHref>
                                <div onClick={() => handleSelect('Live Courses')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Live Courses' ? 'text-blue-500' : ''}`}>
                                    <LiveTvIcon />
                                    {!isCollapsed && <span className="ml-2">Live Courses</span>}
                                </div>
                            </Link>
                        </div>
                        <div>
                            {!isCollapsed && <span>Analytics</span>}
                            <Link href="/admin/course-analytics" passHref>
                                <div onClick={() => handleSelect('Course Analytics')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Course Analytics' ? 'text-blue-500' : ''}`}>
                                    <AnalyticsIcon />
                                    {!isCollapsed && <span className="ml-2">Course Analytics</span>}
                                </div>
                            </Link>
                            <Link href="/admin/user-analytics" passHref>
                                <div onClick={() => handleSelect('User Analytics')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'User Analytics' ? 'text-blue-500' : ''}`}>
                                    <TbReportAnalytics size={20} />
                                    {!isCollapsed && <span className="ml-2">User Analytics</span>}
                                </div>
                            </Link>
                            <Link href="/admin/order-analytics" passHref>
                                <div onClick={() => handleSelect('Order Analytics')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Order Analytics' ? 'text-blue-500' : ''}`}>
                                    <AnalyticsIcon />
                                    {!isCollapsed && <span className="ml-2">Order Analytics</span>}
                                </div>
                            </Link>
                        </div>
                        <div>
                            {!isCollapsed && <span>customization</span>}
                            <Link href="/admin/hero" passHref>
                                <div onClick={() => handleSelect('Hero')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Hero' ? 'text-blue-500' : ''}`}>
                                    <LiaPagerSolid size={20} />
                                    {!isCollapsed && <span className="ml-2">Hero</span>}
                                </div>
                            </Link>
                            <Link href="/admin/faq" passHref>
                                <div onClick={() => handleSelect('Faq')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Faq' ? 'text-blue-500' : ''}`}>
                                    <QuizIcon />
                                    {!isCollapsed && <span className="ml-2">FQA</span>}
                                </div>
                            </Link>
                            <Link href="/admin/categories" passHref>
                                <div onClick={() => handleSelect('Category')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Category' ? 'text-blue-500' : ''}`}>
                                    <CategoryIcon />
                                    {!isCollapsed && <span className="ml-2">Categories</span>}
                                </div>
                            </Link>
                        </div>
                        <div>
                            {!isCollapsed && <span>Controls</span>}
                            <Link href="/admin/team" passHref>
                                <div onClick={() => handleSelect('Manage Team')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Manage Team' ? 'text-blue-500' : ''}`}>
                                    <PeopleIcon />
                                    {!isCollapsed && <span className="ml-2">Manage Team</span>}
                                </div>
                            </Link>
                        </div>

                        <Link href="/admin/settings" passHref>
                            <div onClick={() => handleSelect('Settings')} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500 ${selected === 'Settings' ? 'text-blue-500' : ''}`}>
                                <SettingsIcon />
                                {!isCollapsed && <span className="ml-2">Settings</span>}
                            </div>
                        </Link>
                        <Link href="#" passHref>
                            <div onClick={logoutHandler} className={`flex items-center p-2 mb-1 rounded-md cursor-pointer  hover:text-blue-500`}>
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
