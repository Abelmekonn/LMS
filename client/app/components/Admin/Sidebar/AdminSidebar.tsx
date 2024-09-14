"use client";
import React, { FC, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, IconButton } from '@mui/material';
import {
    HomeOutlinedIcon,
    PeopleOutlinedIcon,
    ReceiptOutlinedIcon,
    SettingsIcon,
    OndemandVideoIcon,
    ExitToAppIcon,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
} from './Icon'; // Import icons from your icons file
import Link from 'next/link';

interface ItemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: (value: string) => void;
    collapsed: boolean;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected, collapsed }) => {
    return (
        <Link href={to} passHref>
            <MenuItem
                active={selected === title}
                onClick={() => setSelected(title)}
                className={`text-gray-600 mb-10 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400
                    ${selected === title ? 'text-blue-500 dark:text-blue-400 font-bold' : ''}`}
            >
                <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-start'}`}>
                    <span>{icon}</span>
                    {!collapsed && <Typography className="text-4xl !font-Poppins">{title}</Typography>}
                </div>
            </MenuItem>
        </Link>
    );
};

const AdminSidebar: FC = () => {
    const [selected, setSelected] = useState("Dashboard");
    const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

    return (
        <Box className={`flex flex-col shadow-lg justify-center relative h-full bg-white dark:bg-gray-800 py-6 ${collapsed ? 'w-24' : 'w-52'} transition-width duration-300`}>
            <ProSidebar collapsed={collapsed}>
                <Box className="flex flex-col items-center mt-5 justify-center h-full">
                    <Menu iconShape="circle" className='gap-6'>
                        <Item
                            title="Dashboard"
                            to="/admin?page=dashboard"
                            icon={<HomeOutlinedIcon fontSize='large' />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Students"
                            to="/admin?page=students"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Orders"
                            to="/admin?page=orders"
                            icon={<ReceiptOutlinedIcon fontSize='large' />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Settings"
                            to="/admin?page=settings"
                            icon={<SettingsIcon fontSize='large' />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Videos"
                            to="/admin?page=videos"
                            icon={<OndemandVideoIcon fontSize='large' />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Logout"
                            to="/logout"
                            icon={<ExitToAppIcon fontSize='large' />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                    </Menu>
                </Box>

                {/* Toggle Button */}
                <Box className="flex justify-end p-2 absolute top-1/2 right-0 mr-[-45px]">
                    <IconButton onClick={() => setCollapsed(!collapsed)} className="text-gray-600 dark:text-gray-300">
                        {collapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                    </IconButton>
                </Box>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;
