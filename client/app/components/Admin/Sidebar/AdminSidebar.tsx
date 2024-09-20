"use client";
import React, { useState, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'; // Import ProSidebar styles
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
import Link from 'next/link'; // Assuming you're using Next.js for routing

// Define the interface for ItemProps
interface ItemProps {
    title: string;
    to?: string; // Made optional for action items like Logout
    icon: JSX.Element;
    selected: string;
    setSelected: (value: string) => void;
    collapsed: boolean; // Control the display based on collapsed state
    onClick?: () => void; // Optional onClick handler for action items
}

const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected, collapsed }) => {
    const handleClick = useCallback(() => {
        setSelected(title);
    }, [title, setSelected]);

    return (
        <Link href={to} passHref>
            <MenuItem
                active={selected === title}
                onClick={handleClick}
                className={`text-white mb-10 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${selected === title ? 'text-blue-500 dark:text-blue-400 font-bold' : ''}`}
            >
                <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-start'}`}>
                    <span>{icon}</span>
                    {!collapsed && <Typography className="text-4xl !font-Poppins">{title}</Typography>}
                </div>
            </MenuItem>
        </Link>
    );
};

// Main Sidebar Component
const AdminSidebar: React.FC = () => {
    const [selected, setSelected] = useState('Dashboard'); // Track the selected menu item
    const [isCollapsed, setIsCollapsed] = useState(false); // Control collapse state

    const handleSelect = useCallback((title: string) => {
        setSelected(title);
    }, [setSelected]);

    const logouHandler = () => {
        // Your logout logic here
        console.log('Logged out');
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent event bubbling
        logouHandler(); // Call your logout logic
    };

    return (
        <Box
            className={`relative left-0 h-full transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'} bg-white text-black dark:bg-blue-200 dark:text-white`}
        >
            {/* ProSidebar wrapper */}
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* Sidebar Header */}
                    <Box className="flex items-center justify-between p-4">
                        <Typography
                            variant="h5"
                            className={`uppercase font-bold ${isCollapsed ? 'hidden' : 'block'}`}
                        >
                            E-Learning
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="dark:text-white">
                            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                        </IconButton>
                    </Box>

                    {/* Sidebar Menu Items */}
                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Item
                            title="Dashboard"
                            to="/admin"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                            collapsed={isCollapsed}
                        />
                         <Typography
                            variant='h6'
                            className='!text-[18px] text-black dark:text-white capitalize !font-[400]'
                        >
                            {!isCollapsed && "Analytics"}
                        </Typography>
                        <Item
                            title="Course Analytics"
                            to="/admin/course-analytics"
                            icon={<AnalyticsIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Item
                            title="Order Analytics"
                            to="/admin/order-analytics"
                            icon={<AnalyticsIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Item
                            title="User Analytics"
                            to="/admin/user-analytics"
                            icon={<AnalyticsIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Typography
                            variant='h6'
                            className='!text-[18px] text-black dark:text-white capitalize !font-[400]'
                        >
                            {!isCollapsed && "Content"}
                        </Typography>
                        <Item
                            title="Live Courses"
                            to="/admin/live-courses"
                            icon={<LiveTvIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Item
                            title="Create Course"
                            to="/admin/create-course"
                            icon={<CreateIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Typography
                            variant='h6'
                            className='!text-[18px] text-black dark:text-white capitalize !font-[400]'
                        >
                            {!isCollapsed && "Customization"}
                        </Typography>
                        <Item
                            title="Hero"
                            to="/admin/hero"
                            icon={<BarChartIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Item
                            title="Categories"
                            to="/admin/categories"
                            icon={<CategoryIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Item
                            title="FAQ"
                            to="/admin/faq"
                            icon={<HelpOutlineIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <Typography
                            variant='h6'
                            className='!text-[18px] text-black dark:text-white capitalize !font-[400]'
                        >
                            {!isCollapsed && "Controller"}
                        </Typography>
                        <Item
                            title="Manage Team"
                            to="/admin/manage-team"
                            icon={<PeopleIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />

                        
                        <Typography
                            variant='h6'
                            className='!text-[18px] text-black dark:text-white capitalize !font-[400]'
                        >
                            {!isCollapsed && "Extras"}
                        </Typography>
                        <Item
                            title="Settings"
                            to="/admin/settings"
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={handleSelect}
                        />
                        <div onClick={handleLogout}>
                            <Item
                                title="Logout"
                                to="#"
                                icon={<LogoutIcon />}
                                selected={selected}
                                setSelected={handleSelect}
                                collapsed={isCollapsed}
                            />
                        </div>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;
