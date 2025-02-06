import React from 'react';
import Link from 'next/link';

type NavItemProps = {
    name: string;
    href: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onClick?: () => void;
    isCollapsed: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ name, href, icon, isSelected, onClick, isCollapsed }) => {
    const itemClass = `flex items-center p-2 mb-1 rounded-md cursor-pointer hover:text-blue-500 ${
        isSelected ? 'text-blue-500' : ''
    }`;

    return (
        <Link href={href} passHref>
            <div onClick={onClick} className={itemClass}>
                {icon}
                {!isCollapsed && <span className="ml-2">{name}</span>}
            </div>
        </Link>
    );
};

export default NavItem;
