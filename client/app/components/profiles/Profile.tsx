'use client';

import React, { FC, useState, useEffect } from 'react';
import SideBarProfile from './SideBarProfile';
import avatarPlaceholder from '../../../public/assets/avatar.jpg';
import { useLogOutMutation } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword"
interface User {
  name: string;
  email: string;
  avatar?: string;
  // Add other user fields as needed
}

type Props = {
  user: User; // Use the User type for better type safety
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarPlaceholder.src);
  const [active, setActive] = useState(1);
  const [logOut] = useLogOutMutation(); // Use mutation hook

  const router = useRouter(); // Correctly use useRouter for App Router

  const logOutHandler = async () => {
    try {
      await logOut(); // Trigger the logout mutation
      await signOut({ redirect: false }); // Prevent automatic redirection
      router.push('/'); // Manual redirection
    } catch (error) {
      console.error('Logout error:', error);
    }
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
    const handleScroll = () => {
      setScroll(window.scrollY > 80);
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);


  useEffect(() => {
    // Set avatar based on the user's data
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#0000001d] border-[#ffffff6d] rounded-[5px] shadow-xl dark:shadow-sm  sticky ${scroll ? "top-[100px]" : "top-[200px]"} left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className='w-full h-full bg-transparent mt-[80px]'>
          <ProfileInfo
            user={user}
            avatar={avatar}
          />
        </div>
      )}
      {
        active === 2 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <ChangePassword />
          </div>
        )
      }
    </div>

  );
};

export default Profile;
