"use client"
import React ,{FC} from 'react';
import CoursePlayer  from "../../../utils/CoursePlayer.tsx"
type Props ={
    active:number;
    setActive:(active:number)=>void;
    courseData : any;
    handelCourseCreate : any;
}
const CoursePreview : FC<Props> = ({
    active ,
    setActive ,
    courseData ,
    handelCourseCreate ,
}) => {
  return (
    <div className='W-[90%] m-auto py-5 mb-5'>
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer 
          videoUrl={courseData?.demoUrl}
          title = {courseData?.title}
          />
        </div>
      </div>
    </div>
  )
}

export default CoursePreview