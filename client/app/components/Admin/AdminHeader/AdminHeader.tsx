import React, { FC, useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Notifications } from "@mui/icons-material";
import avatarDefault from "../../../../public/assets/avatar.jpg";
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
    user: User;
};

const AdminHeader: FC<Props> = ({ user }) => {
    const [avatar, setAvatar] = useState<string>(avatarDefault.src);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user.avatar]);

    return (
        <Box className="flex items-center justify-between h-20 shadow-md  relative   top-0 w-full  px-6 py-4 bg-white dark:bg-gray-800">
            {/* Logo */}
            <Box className='flex justify-end'>
                <Image
                    src={favicon.src}
                    alt="Admin Avatar"
                    className='w-[40px] h-[40px] rounded-lg cursor-pointer'
                    width={30}
                    height={30}
                />
                <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                    ELearning
                </Link>
            </Box>
            {/* Right Icons */}
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
                    <Typography className="ml-2 text-[18px] font-Poppins text-black dark:text-white">
                        {user.name}
                    </Typography>
                </Box>
                <ThemeSwitcher />
            </Box>
        </Box>
    );
};

export default AdminHeader;
