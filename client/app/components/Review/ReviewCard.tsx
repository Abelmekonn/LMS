import Rating from '@/app/utils/Rating'
import Image from 'next/image'
import React from 'react'

type Props = {
    item: any
}

const ReviewCard = ({ item }: Props) => {
    return (
        <div className='w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#0000002B] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-salte-700] rounded-lg p-3 shadow-inner'>
            <div className='flex w-full'>
                <Image
                    src={item.avatar}
                    width={50}
                    height={50}
                    className='w-[50px] h-[50px] rounded-full object-cover' 
                    alt={''} 
                />
                <div className="md:flex justify-between w-full hidden">
                    <div className="pl-4">
                        <h5 className='text-[20px] text-black dark:text-white'>
                            {item.name}
                        </h5>
                        <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
                            {item.profession}
                        </h6>
                    </div>
                    <Rating rating={item.rating}/>
                </div>
                <div className="md:hidden justify-between w-full flex flex-col">
                    <div className="pl-4">
                        <h5 className='text-[20px] text-black dark:text-white'>
                            {item.name}
                        </h5>
                        <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
                            {item.profession}
                        </h6>
                    </div>
                    <Rating rating={item.rating}/>
                </div>
            </div>
            <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
                {item.comment}
            </p>
        </div>
    )
}

export default ReviewCard