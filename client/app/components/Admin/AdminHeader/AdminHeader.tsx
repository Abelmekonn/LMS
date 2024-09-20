import React, { FC, useState, useEffect } from 'react';
import { Box, InputBase, IconButton, Typography } from '@mui/material';
import { Search, Notifications, AccountCircle } from "@mui/icons-material";
import avatarDefault from "../../../../public/assets/avatar.jpg"; // Make sure this path is correct
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from '../../../utils/ThemeSwitcher';
import favicon from "../../../../public/favicon.png"

interface User {
    name: string;
    email: string;
    avatar?: string;
}

type Props = {
    user: User; // Use the User type for better type safety
};

const AdminHeader: FC<Props> = ({ user }) => {
    const [avatar, setAvatar] = useState<string>(avatarDefault.src);
    const { theme, setTheme } = useTheme(); // Next.js theme management
    useEffect(() => {
        // Set avatar based on the user's data
        if (user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user]);

    return (
        <Box className="flex relative h-20 justify-between relative top-0  w-screen items-center px-6 py-4  bg-white dark:bg-gray-800">
            {/* Logo */}
            <Box className=' flex justify-end'>
                <Image
                    src={favicon.src}
                    alt="Admin Avatar"
                    className='w-[40px] h-[40px] rounded-lg cursor-pointer'
                    width={30}
                    height={30}
                />
                <Link href={"/"} className={`text-[25px]  font-Poppins font-[500] text-black dark:text-white`}>
                    ELearning
                </Link>
            </Box>
            {/* Search Bar */}
            {/* <Box className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                <InputBase
                    placeholder="Search..."
                    className="flex-1 text-[16px] text-black dark:text-white"
                />
                <IconButton type="button" className="text-black dark:text-white">
                    <Search />
                </IconButton>
            </Box> */}

            {/* Right Icons (Profile, Notifications) */}
            <Box className="flex items-center gap-4">
                <IconButton>
                    <Notifications className="text-black dark:text-white" />
                </IconButton>
                <Box className="flex items-center gap-2">
                    <Image
                        src={user.avatar ? user.avatar.url : avatarDefault}
                        alt="Admin Avatar"
                        className='w-[30px] h-[30px] rounded-full cursor-pointer'
                        width={30}
                        height={30}
                    />
                    <Typography className="ml-2  text-[18px] font-Poppins text-black dark:text-white">
                        {user.name}
                    </Typography>
                </Box>
                <ThemeSwitcher />
            </Box>
        </Box>
    );
};

export default AdminHeader;
