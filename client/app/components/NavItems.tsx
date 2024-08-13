import Link from 'next/link';
import React from 'react';

export const navItemData = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "About", url: "/about" },
    { name: "Policy", url: "/policy" },
    { name: "FAQ", url: "/faq" }
];

type Props = {
    activeItem: number;
    isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden md:flex'>
                {navItemData.map((i, index) => (
                    <Link href={i.url} key={index} passHref>
                        <span className={`${activeItem === index
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-white text-black"
                            } text-[18px] px-6 font-Poppins font-[400]`}>
                            {i.name}
                        </span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className="md:hidden mt-5">
                    <div className="w-full ml-5 py-6">
                        <Link href={"/"} passHref>
                            <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}>
                                ELearning
                            </span>
                        </Link>
                        {navItemData.map((i, index) => (
                            <Link href={i.url} key={index} passHref>
                                <span className={`${activeItem === index
                                    ? "dark:text-[#37a39a] text-[crimson]"
                                    : "dark:text-white text-black"
                                    } block text-[18px] py-5 font-Poppins font-[400]`}>
                                    {i.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default NavItems;
