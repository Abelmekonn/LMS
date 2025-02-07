'use client';

import React, { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import SideBarProfile from './SideBarProfile';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import CourseCard from '../Course/CourseCard';
import avatarPlaceholder from '../../../public/assets/avatar.jpg';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

interface User {
  name: string;
  email: string;
  avatar?: { url: string };
  courses: any[];
}

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarPlaceholder.src);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<string[]>([]);
  
  const { refetch: logOut } = useLogOutQuery(undefined, { skip: false });
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: userData, isLoading: isUserLoading, refetch } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });
  
  const router = useRouter(); // Use router for redirection
  
  useEffect(() => {
    if (!isUserLoading && !userData) {
      router.push('/'); // Redirect if userData is missing
    }
  }, [isUserLoading, userData, router]);

  const logOutHandler = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    if (data?.data) {
      const filterCourses = user.courses
        .map((userCourse: any) => data.data.find((course: any) => course._id === userCourse._id))
        .filter((course: any) => course != undefined);
      setCourses(filterCourses);
    }
  }, [data, user.courses]);

  return (
    <>
      {userData ? (
        <div className="w-[85%] flex mx-auto my-20">
          <div
            className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#0000001d] border-[#ffffff6d] rounded-[5px] shadow-xl dark:shadow-sm sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}
          >
            <SideBarProfile
              user={user}
              active={active}
              avatar={avatar}
              setActive={setActive}
              logOutHandler={logOutHandler}
            />
          </div>

          {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
          {active === 2 && <ChangePassword />}
          {active === 3 && (
            <div className="w-full pl-7 px-2 md:px-10 md:pl-8">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[35px] lg:grid-cols-3 lg:gap-[35px] xl:grid-col-3 xl:gap-[45px] px-10">
                {courses.length > 0 ? (
                  courses.map((item, index) => (
                    <CourseCard item={item} key={index}  isProfile={true} />
                  ))
                ) : (
                  <h1 className="text-center text-[18px] font-Poppins">
                    You don&apos;t have any purchased courses!
                  </h1>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Profile;
