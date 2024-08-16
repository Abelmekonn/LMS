import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react'
import NavItems from './NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi"
import CustomModel from "../utils/CustomModel"
import Login from "../components/Auth/Login"
import SignUp from "../components/Auth/SignUp"
import Verification from "../components/Auth/Verification.tsx"
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route:string;
    setRoute:(route : string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen,route,setRoute , open }) => {
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    // Debounce function
    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        const debouncedHandleScroll = debounce(handleScroll, 50);

        window.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
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
                            <Link href={"/"}
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}>
                                ELearning
                            </Link>
                        </div>
                        <div className="flex item-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false} />
                            <ThemeSwitcher />
                            {/* only for mobile */}
                            <div className='md:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className=" cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className='hidden md:block cursor-pointer dark:text-white text-black'
                                onClick={() => {
                                    setRoute("login");
                                    setOpen(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                {
                    openSidebar && (
                        <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] mx-3"
                            onClick={handleClose}
                            id='screen'
                        >
                            <div className='w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <NavItems
                                    activeItem={activeItem}
                                    isMobile={true} />
                                <HiOutlineUserCircle
                                    size={25}
                                    className='cursor-pointer ml-3 dark:text-white text-black '
                                    onClick={() => {
                                        setRoute("login");
                                        setOpen(true);
                                        setOpenSidebar(false);
                                    }}
                                />
                                <br />
                                <br />
                                <p className='text-[16px] px-2  text-black dark:text-white'>
                                    Copyright &#169; 2023 ELearning
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                route === "login" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "sign-up" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={SignUp}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === "verification" && (
                    <>
                        {
                            open && (
                                <CustomModel 
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header;