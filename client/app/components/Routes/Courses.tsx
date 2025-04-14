import React, { useEffect, useState } from 'react';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from "../Course/CourseCard";
import { Button } from '@/components/ui/button';

type Props = {};

const Courses = (props: Props) => {
    const { data } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        setCourses(data?.data|| []); // Ensure courses defaults to an empty array if data is undefined
    }, [data]);

    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto `}>
                <p className='text-center dark:text-white text-gray-600 text-lg mt-8 mb-3' >
                    Join our 2000+ students who have already started their journey to success.
                </p>
                <h1 className="text-center  font-Poppins text-[25px] leading-[35px] sm:text-3xl lg-text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                    Expand Your Career{" "}
                    <span className='text-gradient bg-gradient-to-r from-[#427BFC] via-[#427BFC] to-[#2E3FAB] bg-clip-text text-transparent'>Opportunity</span> <br />
                    Opportunity With Our Courses
                </h1>
                <br />
                <br />
                <h2 className='text-xl font-semibold px-3 mb-5 font-Poppins'>Most purchased courses </h2>
                <div className="w-[70%] mx-auto md:w-full grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {courses?.map((item: any, index: number) => (
                        <>
                        <CourseCard item={item} key={index} isProfile={false} />
                        </>
                    ))}
                </div>
                <div className='flex justify-center'>
                    <Button className='bg-primary self-center items-center dark:text-black text-white px-4 py-2 rounded-md'>View All Courses</Button>
                </div>
            </div>
        </div>
    );
};

export default Courses;
