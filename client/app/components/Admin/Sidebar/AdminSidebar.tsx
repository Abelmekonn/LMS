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
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            className={`text-gray-600 mb-10 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400
                ${selected === title ? 'text-blue-500 dark:text-blue-400 font-bold' : ''}`}
        >
            <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-start'} `}>
                <span className=''>{icon}</span>
                {!collapsed && <Typography className="text-4xl !font-Poppins">{title}</Typography>}
            </div>
            <Link href={to} className="no-underline" />
        </MenuItem>
    );
};

const AdminSidebar: FC = () => {
    const [selected, setSelected] = useState("Dashboard");
    const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

    return (
        <Box className={`flex flex-col  relative z-50 h-screen shadow-lg bg-white dark:bg-gray-800 py-6 ${collapsed ? 'w-24' : 'w-52'} transition-width duration-300`}>
            <div className='mb-5 flex justify-center'>
                <Link href={"/"} className={`text-[25px] mb-10 font-Poppins font-[500] text-black dark:text-white`}>
                    {collapsed ? "" : "ELearning"}
                </Link>
            </div>
            <ProSidebar collapsed={collapsed} >
                {/* Sidebar Menu centered vertically */}
                <Box className="flex flex-col items-center justify-center h-full">
                    <Menu iconShape="circle" className='gap-6'>
                        <Item
                            title="Dashboard"
                            to="/admin/dashboard"
                            icon={<HomeOutlinedIcon fontSize='large'/>}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Students"
                            to="/admin/students"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Orders"
                            to="/admin/orders"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Settings"
                            to="/admin/settings"
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Videos"
                            to="/admin/videos"
                            icon={<OndemandVideoIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            collapsed={collapsed}
                        />
                        <Item
                            title="Logout"
                            to="/logout"
                            icon={<ExitToAppIcon />}
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
