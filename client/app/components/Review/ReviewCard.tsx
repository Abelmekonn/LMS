import Rating from '@/app/utils/Rating'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'

type Props = {
    item: any
}

const ReviewCard = ({ item }: Props) => {
    return (
        <Card className='w-full h-full pb-4 bg-transparent p-4 flex flex-col justify-between'>
            <RiDoubleQuotesL size={40} className='text-primary dark:text-white' />
            <p className="pt-2 px-2 font-Poppins text-black dark:text-white text-base">
                {item.comment}
            </p>
            <div className='flex w-full items-center gap-2 my-4'>
                <Image
                    src={item.avatar}
                    width={40}
                    height={40}
                    className='w-[40px] h-[40px] rounded-full object-cover'
                    alt={''}
                    layout=''
                />
                <div className="md:flex justify-between w-full hidden ">
                    <div className="pl-4">
                        <h5 className='text-[15px] text-[#131212] font-Poppins font-medium dark:text-white'>
                            {item.name}
                        </h5>
                        <h6 className="text-[14px] text-[#464646] font-Poppins dark:text-[#ffffffab]">
                            {item.profession}
                        </h6>
                    </div>
                </div>
            </div>
            <Rating rating={item.rating} />
        </Card>
    )
}

export default ReviewCard