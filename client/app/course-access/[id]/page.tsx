"use client";

import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
    params:any
}

const Page = ({ params }: Props) => {
    const { id } = params;

    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const router = useRouter();

    useEffect(()=>{
        if (data) {
            const isPurchased = data.user.courses.find((item:any)=>item._id === id);
            if (!isPurchased) { 
                router.push(``);
            }
        }
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return (
        <div>
            page
        </div>
    );
};

export default Page;
