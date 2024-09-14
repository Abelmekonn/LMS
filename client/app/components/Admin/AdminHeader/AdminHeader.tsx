import React from 'react';
import { Box, InputBase, IconButton, Typography } from '@mui/material';
import { Search, Notifications, AccountCircle } from "@mui/icons-material";
import avatarDefault from "../../../../public/assets/avatar.jpg"; // Make sure this path is correct
import { useTheme } from 'next-themes';
import Image from 'next/image';


const AdminHeader: React.FC = () => {
    const { theme, setTheme } = useTheme(); // Next.js theme management

    return (
        <Box className="flex h-20 justify-end relative top-0  w-screen items-center px-6 py-4 shadow-lg bg-white dark:bg-gray-800">
            {/* Logo */}

            {/* Search Bar */}
            <Box className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                <InputBase
                    placeholder="Search..."
                    className="flex-1 text-[16px] text-black dark:text-white"
                />
                <IconButton type="button" className="text-black dark:text-white">
                    <Search />
                </IconButton>
            </Box>

            {/* Right Icons (Profile, Notifications) */}
            <Box className="flex items-center gap-4">
                <IconButton>
                    <Notifications className="text-black dark:text-white" />
                </IconButton>
                <Box className="flex items-center">
                    <Image
                        src={avatarDefault.src}
                        alt="Admin Avatar"
                        className='w-[30px] h-[30px] rounded-full cursor-pointer'
                        width={30}
                        height={30}
                    />
                    <Typography className="ml-2 text-[18px] font-Poppins text-black dark:text-white">
                        Admin Name
                    </Typography>
                </Box>
                <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? "🌙" : "☀️"}
                </IconButton>
            </Box>
        </Box>
    );
};

export default AdminHeader;
