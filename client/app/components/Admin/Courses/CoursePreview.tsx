"use client"
import React, { FC } from 'react';
import CoursePlayer from "../../../utils/CoursePlayer"
import Rating from "../../../utils/Rating"
import { styles } from '../../../../app/styles/style';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdDoubleArrow } from 'react-icons/md';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handelCourseCreate: any;
  isEdit:boolean;
}

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handelCourseCreate,
  isEdit
}) => {

  const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  }
  const createCourse = () => {
    handelCourseCreate();
  }
  console.log("preview data ",courseData)
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
            className={` flex-row my-3 justify-content-center text-center text-white !w-[180px] justify-center py-3 rounded-3xl font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder='Discount code..'
            className={`${styles.input} 2xl:!w-[50%] xl:w-[60%] ml-3 !mt-0`}
          />
          <div className={`flex-row justify-content-center text-center text-white rounded-3xl bg-blue-400 py-2 !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
            Apply
          </div>
        </div>
        <p className="text-[18px] dark:text-white flex items-center pb-1"><MdDoubleArrow size={20} /> Source code included</p>
        <p className="text-[18px] dark:text-white flex items-center pb-1"><MdDoubleArrow size={20}/> Full lifetime access</p>
        <p className="text-[18px] dark:text-white flex items-center pb-1"><MdDoubleArrow size={20}/> Certificate of completion</p>
        <p className='text-[18px] dark:text-white pb-3 flex items-center md:pb-1'><MdDoubleArrow size={20}/> Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <h1 className="font-Poppins dark:text-white text-[25px] font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center dark:text-white justify-between pt-3">
            <div className="flex items-center dark:text-white">
              <Rating rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className='text-[25px] font-Poppins dark:text-white font-[600]'>
            What you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex dark:text-white md:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} className="dark:text-white" />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <h1 className='text-[25px] font-Poppins dark:text-white font-[600]'>
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex dark:text-white md:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} className="dark:text-white" />
            </div>
            <p className='pl-2'>{item.title}</p>
          </div>
        ))}
        <div className="w-full dark:text-white">
          <h1 className="text-[25px] dark:text-white font-Poppins font-[600]">
            Course Details
          </h1>
          {courseData?.description}
        </div>
      </div>
      <br /><br />
      <div className="w-full flex justify-between items-center">
        <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          {
            isEdit ? "Update" : "Create"
          }
        </div>
      </div>
    </div>
  )
}

export default CoursePreview;
