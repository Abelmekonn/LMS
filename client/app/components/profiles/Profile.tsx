'use client';

import React, { FC, useState, useEffect, useRef } from 'react';
import SideBarProfile from './SideBarProfile';
import avatarPlaceholder from '../../../public/assets/avatar.jpg';
import { useLogOutQuery } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from '../Course/CourseCard';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
interface User {
  name: string;
  email: string;
  avatar?: string;
  courses: any[]; // Add courses property to User interface
}

type Props = {
  user: User; // Use the User type for better type safety
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarPlaceholder.src);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<string[]>([]);
  const { refetch: logOut } = useLogOutQuery(undefined, { skip: true });
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter(); // Correctly use useRouter for App Router

  const logOutHandler = async () => {
    try {
      await logOut(); // Remove empty object argument
      router.push('/');
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

  useEffect(() => {
    if (data && data?.data) {
      const filterCourses = user.courses
        .map((userCourse: any) => data.data.find((course: any) => course._id === userCourse._id))
        .filter((course: any) => course != undefined);
      setCourses(filterCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto my-20">
      <div
        className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#0000001d] border-[#ffffff6d] rounded-[5px] shadow-xl dark:shadow-sm  sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}
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
        <div className='w-full h-full bg-transparent '>
          <ProfileInfo
            user={user}
            avatar={avatar}
          />
        </div>
      )}
      {
        active === 2 && (
          <div className='w-full h-full bg-transparent'>
            <ChangePassword />
          </div>
        )
      }
      {
        active === 3 && (
          <div className='w-full pl-7 px-2 md:px-10 md:pl-8'>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[35px] lg:grid-cols-3 lg:gap-[35px] xl:grid-col-3 xl:gap-[45px] px-10">
              {courses && 
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} user={user} isProfile={true} />
                ))
              }
            </div>
            {courses.length === 0 && (
              <h1 className="text-center text-[18px] font-Poppins">
                You don&apos;t have any purchased courses!
              </h1>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Profile;
