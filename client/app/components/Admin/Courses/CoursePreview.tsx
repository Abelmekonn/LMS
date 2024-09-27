"use client"
import React, { FC } from 'react';
import CoursePlayer from "../../../utils/CoursePlayer"
import Rating from "../../../utils/Rating"
import { styles } from '../../../../app/styles/style';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handelCourseCreate: any;
}
const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handelCourseCreate,
}) => {

  const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0)

  return (
    <div className='W-[90%] m-auto py-5 mb-5'>
      <div className="w-full relative">
        <div className="w-[90%] mx-auto mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] ">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
            {courseData?.estimatedPrice} $
          </h5>
          <h4 className='pl-5 pt-4 text-[22px]'>
            {discountPercentagePrice}% off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center">
          <input type="text"
            name=''
            id=''
            placeholder='Discount code..'
            className={`${styles.input}  2xl:!w-[50%] xl:w-[60%] ml-3 !mt-0`}
          />
          <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
            Apply
          </div>
        </div>
        <p className="pb-1">. Source code included</p>
        <p className="pb-1">.Full lifetime access</p>
        <p className="pb-1">. Certificate of completion</p>
        <p className='pb-3 md:pb-1'>. Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <h1 className="font-Poppins text-[25px] font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Rating rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className='text-[25px] font-Poppins font-[600]'>
            What you will learn from this course ?
          </h1>
        </div>
        {
          courseData?.benefits?.map((item: any, index: number) => {
            <div className="w-full flex md:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoMdCheckmarkCircleOutline size={20} />
              </div>
              <p className="p1-2">
                {item.title}
              </p>
            </div>
          })
        }
        <br />
        <br />
        {/* course description */}
        {courseData?.description}
      </div>
      <br /><br />
    </div>
  )
}

export default CoursePreview