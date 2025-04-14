"use client"
import Rating from '@/app/utils/Rating';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
    item: any;
    isProfile: any;
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
            <Card className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg  shadow-sm dark:shadow-inner">
                <div className='relative w-full h-full bg-gray-100 overflow-hidden  group-hover:shadow-xl transition-all duration-300'>
                    <Image src={item.thumbnail.url} width={500} height={200} objectFit="contain " className='rounded hover:scale-110 w-full h-[200px]' alt='' />
                </div>
                <br />
                <h1 className='font-Poppins text-[18px] text-black dark:text-[#fff] mb-3 px-3'>
                    {item.name}
                </h1>
                <h2 className=' text-gray-500 text-lg mb-4 px-3'>{item.author}</h2>
                <div className="flex-col w-full items-center justify-between pt-2 px-3">
                    <p className='flex items-center gap-2'>
                        <Rating rating={item.rating} />
                        <p>(44k Reviews)</p>
                    </p>
                    <h5 className={`text-black dark:text-[#fff]
                        ${isProfile && "hidden 800px:inline"}`}>
                        {item.purchased} Enrols
                    </h5>
                </div>
                <div className="w-full flex items-center justify-between pt-3 px-3 mb-3">
                    <div className="flex">
                        <h3 className='text-black dark:text-[#fff] text-xl'>
                            ${item.price === 0 ? "Free" : item.price + '5'}
                        </h3>
                        <h5 className='pl-3 text-[17px] text-[#d0536c] line-through self-center text-center '>
                            {item.estimatedPrice}
                        </h5>
                    </div>
                    <div className="flex items-center pb-3 text-black dark:text-[#fff]">
                        <AiOutlineUnorderedList size={20} />
                        <h5 className='pl-2 '>
                            {item.courseData?.length} Lectures
                        </h5>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CourseCard