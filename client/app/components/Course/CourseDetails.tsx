import React from 'react'
import { useSelector } from 'react-redux';

type Props = {
    data : any;
}

const CourseDetails = ({data}: Props) => {
    const {user} = useSelector((state:any) => state.user);
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
                    
                </div>
            </div>
        </div>
    )
}

export default CourseDetails