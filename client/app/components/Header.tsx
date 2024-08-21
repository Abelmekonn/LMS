import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react';
import NavItems from './NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from 'react-redux';
import avatar from "../../public/assets/avatar.jpg";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useLogOutMutation, useSocialAuthMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

interface User {
    email?: string;
    name?: string;
    image?: string;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const { data: sessionData } = useSession();
    const [socialAuth, { isSuccess, isError }] = useSocialAuthMutation();
    const [logOut, { isLoading }] = useLogOutMutation();

    useEffect(() => {
        if (!user && sessionData) {
            socialAuth({
                email: sessionData.user?.email,
                name: sessionData.user?.name,
                avatar: sessionData.user?.image
            });
        }

        if (isSuccess) {
            toast.success("Login Successful");
        }

        if (isError) {
            toast.error("Login Failed");
        }
    }, [sessionData, user, socialAuth, isSuccess, isError]);

    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 80);
        };

        const debouncedHandleScroll = debounce(handleScroll, 50);
        window.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);

    const handleClose = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === "screen") {
            setOpenSidebar(false);
        }
    };

    const logOutHandler = async () => {
        try {
            await logOut().unwrap();
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    // Debounce function
    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    return (
        <div className='w-full relative'>
            <div className={`${active ?
                "dark:bg-opacity-80 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                }`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full flex h-[80px] items-center justify-between p-3">
                        <div>
                            <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                ELearning
                            </Link>
                        </div>
                        <div className="flex item-center">
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                            <div className='md:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            {user ? (
                                <Link href={"/profile"}>
                                    <Image
                                        src={user.avatar ? user.avatar.url : avatar}
                                        alt="User Avatar"
                                        className='w-[30px] h-[30px] rounded-full cursor-pointer'
                                        width={30}
                                        height={30}
                                        style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                        priority
                                    />

                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={25}
                                    className='hidden md:block cursor-pointer dark:text-white text-black'
                                    onClick={() => {
                                        setRoute("login");
                                        setOpen(true);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {openSidebar && (
                    <div
                        className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] mx-3"
                        onClick={handleClose}
                        id='screen'
                    >
                        <div className='w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle
                                size={25}
                                className='cursor-pointer ml-3 dark:text-white text-black'
                                onClick={() => {
                                    setRoute("login");
                                    setOpen(true);
                                    setOpenSidebar(false);
                                }}
                            />
                            <br />
                            <br />
                            <p className='text-[16px] px-2 text-black dark:text-white'>
                                Copyright &#169; 2023 ELearning
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {route === "login" && open && (
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Login}
                />
            )}
            {route === "sign-up" && open && (
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={SignUp}
                />
            )}
            {route === "verification" && open && (
                <CustomModel
                    open={open}
                    setOpen={setOpen}
                    setRoute={setRoute}
                    activeItem={activeItem}
                    component={Verification}
                />
            )}
        </div>
    );
};

export default Header;
