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
        <Box className="flex items-center justify-end h-20  relative   top-0 w-full  px-6 py-4">
            {/* Logo */}
            
            {/* Right Icons */}
            <Box className="flex items-center gap-3">
                <IconButton>
                    <Notifications className="text-black dark:text-white" />
                </IconButton>
                
                <ThemeSwitcher />
            </Box>
        </Box>
    );
};

export default AdminHeader;
