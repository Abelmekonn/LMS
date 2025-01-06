import React, { FC, useState, useEffect } from 'react';
import { Box, IconButton, Typography, Badge, Avatar, useMediaQuery } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import avatarDefault from '../../../../public/assets/avatar.jpg';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '../../../utils/ThemeSwitcher';

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
    const { theme } = useTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user.avatar]);

    return (
        <Box className="flex items-center mr-10 z-[9999999] justify-end h-20 px-6 py-4 bg-white dark:bg-gray-800">
            {/* Right Section */}
            <Box className="flex items-center gap-4">
                {/* Notifications */}
                <IconButton>
                    <Badge badgeContent={35} color="error">
                        <Notifications className="text-black dark:text-white" />
                    </Badge>
                </IconButton>
                {/* Theme Switcher */}
                <ThemeSwitcher />
                {/* User Info */}
                <Box className="flex items-center gap-2">
                    <Avatar src={avatar} alt="User Avatar" />
                    <Typography variant="body1" className="text-black dark:text-white">
                        {user.name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminHeader;
