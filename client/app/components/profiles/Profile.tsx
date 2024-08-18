'use client';

import React, { FC, useState, useEffect } from 'react';
import SideBarProfile from './SideBarProfile';
import { useSelector } from 'react-redux';
import avatarPlaceholder from '../../../public/assets/avatar.jpg';
import Image from 'next/image';
import { useLogOutQuery } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  user: any; // Consider defining a User type for better type safety
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [active, setActive] = useState(1);
  const [logout,setLogout] = useState(false)
  const {} = useLogOutQuery(undefined,{
    skip: !logout ? true :false 
  });

  const logOutHandler = async () => {
    setLogout(true)
    signOut();
    redirect("/")
  };

  // Debounce function to optimize scroll event handling
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    // Handle scrolling event with debounce
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedHandleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    // Set avatar based on the user's data
    if (user && user.avatar) {
      setAvatar(user.avatar);
    } else {
      setAvatar(avatarPlaceholder.src);
    }
  }, [user]);

  return (
    <div>
      <div className="w-[85%] flex mx-auto">
        <div
          className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#0000001d] border-[#ffffff6d] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[200px] " : "top-[300px]"
            } left-[30px]`}
        >
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
