import React, { FC, useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import avatarDefault from '../../../../public/assets/avatar.jpg';
import { ThemeSwitcher } from '../../../utils/ThemeSwitcher';
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationApi';
import socketId from "socket.io-client";
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVICE_URI || "";
const socket = socketId(ENDPOINT, { transports: ['websocket'] });

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
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the notification dropdown

    const { data, refetch } = useGetAllNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
    const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);

    const audio = new Audio(
        "https://res.cloudinary.com/detxtubji/video/upload/v1736174433/arpeggio-467_fjbgsc.mp3"
    );

    const playNotificationSound = () => {
        try {
            audio.play();
        } catch (error) {
            console.error("Audio playback error:", error);
        }
    };

    useEffect(() => {
        if (data && data.notification) {
            const unread = data.notification.filter((item: any) => item.status === "unread");
            setUnreadNotifications(unread);
        }
    }, [data]);

    useEffect(() => {
        socket.on("notification", () => {
            refetch();
            playNotificationSound();
        });

        return () => {
            socket.off("notification");
        };
    }, [refetch]);

    useEffect(() => {
        if (user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user.avatar]);

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id);
        refetch();
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Box className="flex items-center z-[9999999] justify-end h-20 px-6 py-4 bg-white dark:bg-gray-800">
            <Box className="flex items-center gap-4">
                <IconButton onClick={handleOpen}>
                    <div style={{ position: 'relative' }}>
                        <Notifications className="text-black dark:text-white" />
                        <span
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
                        >
                            {unreadNotifications.length}
                        </span>
                    </div>
                </IconButton>
                {open && (
                    <Box
                        ref={dropdownRef} // Attach ref to the dropdown box
                        className="absolute right-0 top-20 w-80 h-96 bg-white dark:bg-gray-800 shadow-md rounded-md p-4 mr-2 mt-1"
                    >
                        <Typography variant="h6" className="text-black dark:text-white">
                            Notifications
                        </Typography>
                        <Box className="overflow-y-auto h-80">
                            {unreadNotifications.length ? (
                                unreadNotifications.map((item: any) => (
                                    <Box
                                        key={item._id}
                                        className="flex items-center gap-2 p-2 cursor-pointer bg-gray-100 rounded-lg dark:bg-gray-700 relative mb-3"
                                    >
                                        <Box>
                                            <span
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
                                                onClick={() => handleNotificationStatusChange(item._id)}
                                            >
                                                Mark as Read
                                            </span>
                                            <Typography variant="body1" className="text-black dark:text-white">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                                                {item.message}
                                            </Typography>
                                            <Typography variant="caption" className="text-gray-400 dark:text-gray-500">
                                                {format(item.createdAt).toString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography className="text-gray-500 dark:text-gray-400 mt-4">
                                    No new notifications
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
                <ThemeSwitcher />
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
