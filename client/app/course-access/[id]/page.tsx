"use client";
import Loader from '@/app/components/loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import CourseContent from '../../components/Course/CourseContent';

type Props = {
    params: { id: string };
};

const Page = ({ params }: Props) => {
    const { id } = params;

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && data) {
            const isPurchased = data.user.courses.some((item: any) => item.courseId === id);

            if (!isPurchased) {
                router.push('/'); 
            }
            if (error) {
                console.log('error');
            }
        }

        if (error) {
            console.error('Error loading user data:', error);
        }
    }, [isLoading, data, error, id, router]);

    if (isLoading) return <div><Loader /></div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return (
        <div>
            <CourseContent id={id} user={data?.user} />
        </div>
    );
};

export default Page;
