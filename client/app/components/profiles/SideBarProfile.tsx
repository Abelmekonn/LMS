import Image from 'next/image';
import React, { FC } from 'react';
import avatarDefault from '../../../public/assets/avatar.jpg';
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from 'react-icons/ai';

type Props = {
    user: any; // Consider defining a User type
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
    const avatarSrc = user?.avatar || avatar || avatarDefault.src;

    return (
        <div className="w-full">
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'}`}
                onClick={() => setActive(1)}
            >
                <Image
                    src={avatarSrc}
                    alt="User Avatar"
                    width={30} // Set default dimensions
                    height={30}
                    className='w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full'
                />
                <h5
                    className='pl-2 md:block hidden font-Poppins dark:text-white text-black'
                >
                    My Account
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-Poppins dark:text-white text-black'>
                    Change Password
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-Poppins dark:text-white text-black'>
                    Enrolled Courses
                </h5>
            </div>
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'}`}
                onClick={() => logOutHandler()}
            >
                <AiOutlineLogout size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 md:block hidden font-Poppins dark:text-white text-black'>
                    Log Out
                </h5>
            </div>
        </div>
    );
};

export default SideBarProfile;