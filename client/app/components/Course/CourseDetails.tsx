import Rating from '@/app/utils/Rating';
import React from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

type Props = {
    data : any;
}

const CourseDetails = ({data}: Props) => {
    const user = useSelector((state: any) => state.auth);
    const discountPercentage = 
        ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
    
    const discountPercentagePrice =discountPercentage.toFixed(0);

    const isPurchased = user && user?.courses?.find((item : any) => item.id === data.id);

    const handleOrder = (e:any) => (
        e.preventDefault(),
    )

    return (
        <div>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5">
                <div className="w-full flex flex-col-reverse 800px:flex-row">
                    <div className="w-full 800px:w-[65%] 800px:pr-5">
                        <h1 className='text-[25px] font-Poppins font-[60] text-black dark:text-white '>
                            {data?.name}
                        </h1>
                        <div className='flex items-center justify-between pt-3'>
                            <div className="flex items-center">
                                <Rating rating={data.rating}/>
                                <h5 className="text-black dark:text-white ">{data.reviews?.length}</h5>
                            </div>
                            <h5 className='text-black dark:text-white'>{data.purchased}</h5>
                        </div>
                        <br />
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            What you will learn from this course 
                        </h1>
                        <div>
                            {data.benefits?.map((items:any , index:number)=> {
                                <div 
                                    className='w-full flex 800px:items-center py-2'
                                    key={index}
                                >
                                    <div className="w-[15px] mr-1">
                                        <IoCheckmarkCircleOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{items.title}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails