import React, { useCallback } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Typography } from '@mui/material';
import Link from 'next/link'; // Import Next.js Link for routing

interface ItemProps {
    title: string;
    to?: string; // Optional for items like Logout
    icon: JSX.Element;
    selected: string;
    setSelected: (value: string) => void;
    collapsed: boolean;
    onClick?: () => void; // Optional onClick handler for custom actions like Logout
}

const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected, collapsed, onClick }) => {
    const handleClick = useCallback(() => {
        setSelected(title);
        if (onClick) {
            onClick(); // Trigger the custom action like Logout
        }
    }, [title, setSelected, onClick]);

    return (
        <Link href={to || '#'} passHref>
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

export default Item;
