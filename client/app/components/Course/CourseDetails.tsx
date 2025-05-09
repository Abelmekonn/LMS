"use client"
import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Rating from '@/app/utils/Rating';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircleOutline, IoCloseOutline } from 'react-icons/io5';
import { PiDot } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import CourseContentList from "../Course/CourseContentList"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../Payment/CheckoutForm"
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { format } from 'timeago.js';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';

type Props = {
    data: any;
    clientSecret: any;
    stripePromise: any;
    setOpen: any;
    setRoute: any;
}

const CourseDetails = ({ data, clientSecret, stripePromise , setRoute ,setOpen:openAuthMode }: Props) => {
    const { data: userData } = useLoadUserQuery(undefined, {})
    const [user , setUser] = useState<any>()

    useEffect(()=>{
        setUser(userData?.user)
    },[userData])

    const [open, setOpen] = useState(false)
    const discountPercentage =
        ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

    const discountPercentagePrice = discountPercentage.toFixed(0);

    const isPurchased = user && user?.courses?.find((item: any) => item.id === data.id);

    const handleOrder = (e: any) => {
        if(user){
            setOpen(true)
        } else {
            setRoute("login")
            openAuthMode(true)
        }
    }

    return (
        <div>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5">
                <div className="w-full flex flex-col-reverse md:flex-row">
                    <div className="w-full md:w-[65%] md:pr-5">
                        <h1 className='text-[25px] font-Poppins font-[60] text-black dark:text-white '>
                            {data?.name}
                        </h1>
                        <div className='flex items-center justify-between pt-3'>
                            <div className="flex items-center">
                                <Rating rating={data.rating} />
                                <h5 className="text-black text-[18px] dark:text-white ">{data.reviews?.length}</h5>
                            </div>
                            <h5 className='text-black dark:text-white mr-10'>{data.purchased} Students</h5>
                        </div>
                        <br />
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            What you will learn from this course
                        </h1>
                        <div>
                            {data.benefits?.map((item: any, index: number) => (
                                <div
                                    className='w-full flex 800px:items-center py-2'
                                    key={index}
                                >
                                    <div className="w-[15px] mr-1">
                                        <IoCheckmarkCircleOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            What are the prerequisites for starting this courses ?
                        </h1>
                        <div>
                            {data.prerequisites?.map((item: any, index: number) => (
                                <div
                                    className='w-full flex 800px:items-center py-2'
                                    key={index}
                                >
                                    <div className="w-[15px] mr-1">
                                        <IoCheckmarkCircleOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                        <div>
                            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                Course Overview
                            </h1>
                            <CourseContentList
                                data={data?.courseData}
                                isDemo={true}
                            />
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                Course Details
                            </h1>
                            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                                {data.description}
                            </p>
                        </div>
                        <div className="w-full mt-8">
                            <div className="flex flex-col">
                                <div className='flex items-center gap-3'>
                                    <Rating rating={data?.ratings} />
                                    <div className="mb-2 800px:mb-[unset]">
                                        <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                                            {Number.isInteger(data?.ratings)
                                                ? data?.ratings.toFixed(1)
                                                : data?.ratings.toFixed(2)}{""}
                                            Course Rating . {data?.reviews?.length} Reviews
                                        </h5>
                                    </div>
                                </div>
                                <br />
                                {(
                                    data?.reviews && [...data.reviews].reverse()
                                ).map((item: any, index: number) => (
                                    <div className="w-full pb-4" key={index}>
                                        <div className="flex">
                                            <div className="w-[50px] h-[50px]">
                                                <div className="w-[50px] h-[50px]">
                                                    <Image
                                                        src={item?.user?.avatar?.url || "https://randomuser.me/api/portraits/men/5.jpg"}
                                                        alt={`${item?.user?.name || 'User'}'s avatar`}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full object-cover w-[50px] h-[50px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="hidden md:block pl-2">
                                                <div className="flex items-center">
                                                    <h5 className="text-[18px] pr-2 text-black dark:text-white">
                                                        {item.user.name}
                                                    </h5>
                                                    <Rating rating={item.rating} />
                                                </div>
                                                <p className="text-black dark:text-white ">{item.comment}</p>
                                                <small className="text-[#000000d1] dark:text-[#ffffff83]">
                                                    {format(item.createdAt).toString()}
                                                </small>
                                            </div>
                                            <div className="pl-2 flex md:hidden items-center ">
                                                <h5 className="text-[18px] pr-2 text-black dark:text-white">{item.user.name}</h5>
                                                <Rating rating={item.rating} />
                                            </div>
                                        </div>
                                        {item.commentReplies.map((reply: any, index: number) => {
                                            <div className="w-full flex md:ml-16 my-5">
                                                <div className="w-[50px] h-[50px]">
                                                    <Image
                                                        src={item?.user?.avatar?.url || "https://randomuser.me/api/portraits/men/5.jpg"}
                                                        alt={`${item?.user?.name || 'User'}'s avatar`}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full object-cover w-[50px] h-[50px]"
                                                    />
                                                </div>
                                                <div className="pl-2">
                                                    <div className="flex items-center">
                                                        <h5 className="text-[20px]">{reply.name}</h5>{""}
                                                        <VscVerifiedFilled className='text-[#0095F6] ml-2 text-[20px]'/>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[35%] relative">
                        <div className="sticky top-[100px] left-0 z-50 w-full">
                            <CoursePlayer
                                videoUrl={data?.demoUrl}
                                title={data?.title}
                            />
                            <div className="flex items-center ">
                                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                                    {data.price === 0 ? "Free" : data.price + "$"}
                                </h1>
                                <h5 className="pt-5 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                                    {data.estimatedPrice}$
                                </h5>
                                <h4 className='pl-5 pt-4 text-[22px] text-black dark:text-white'>
                                    {discountPercentagePrice}% off
                                </h4>
                            </div>
                            <div className="flex items-center">
                                {isPurchased ? (
                                    <Link
                                        className={`flex flex-row justify-content-center item-center text-white py-3 px-6 rounded-full  min-h min-h-[45px]  text-[26px]  font-semibold  my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                                        href={`/course-access/${data._id}`}
                                    >
                                        Enter to course
                                    </Link>
                                ) : (
                                    <div
                                        className={`flex flex-row justify-content-center item-center py-3 px-6 rounded-full  min-h min-h-[45px]  text-[26px]  font-semibold !w-[220px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                                        onClick={handleOrder}
                                    >
                                        Buy Now {data.price}$
                                    </div>
                                )}
                            </div>
                            <br />
                            <p className="pb-1 text-lg text-black dark:text-white flex items-center"><PiDot size={40} /> Source code included</p>
                            <p className="pb-1 text-lg text-black dark:text-white flex items-center"><PiDot size={40} /> Full lifetime access</p>
                            <p className="pb-1 text-lg text-black dark:text-white flex items-center"><PiDot size={40} /> Certificate of completion</p>
                            <p className="pb-1 text-lg text-black dark:text-white flex items-center"><PiDot size={40} /> Premium support</p>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {
                    open && (
                        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
                            <div className="w-[500px] min-h-[500px] bg-white dark:bg-black rounded-xl shadow p-3">
                                <div className="w-full flex justify-end">
                                    <IoCloseOutline
                                        size={40}
                                        className="text-black cursor-pointer dark:text-white"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <div className="w-full">
                                    {stripePromise && (
                                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                                            <CheckoutForm setOpen={setOpen} data={data} user={user}/>
                                        </Elements>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}

export default CourseDetails