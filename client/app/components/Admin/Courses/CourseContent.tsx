import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void
    handelSubmit: any
}

const CourseContent: FC<Props> = ({
    active,
    setActive,
    courseContentData,
    setCourseContentData,
    handelSubmit: handelCourseController
}) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1)

    const handelSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className='w-[80%] m-auto p-3'>
            <form onSubmit={handelSubmit}>
                {
                    courseContentData.map((item: any, index: number) => {
                        const showSectionInput =
                            index === 0 ||
                            item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                                    }`}>
                                        <div className="flex w-full items-center justify-between my-0">
                                            {isCollapsed[index] ? (
                                                <>
                                                {
                                                    item.title ? (
                                                        <p className='font-Poppins dark:text-white text-black'>
                                                            {index + 1}.{item .title}
                                                        </p>
                                                    ):(
                                                        <></>
                                                    )
                                                }
                                                </>
                                            ): (
                                                <div></div>
                                            )
                                        }
                                        <div className="flex items-center">
                                            <AiOutlineDelete 
                                            className={`dark:text-white text-[20px] mr-2 text-black ${
                                                index > 0 ?"cursor-pointer" : "cursor-no-drop"
                                            }`}
                                            
                                            />
                                        </div>
                                        </div>
                                </div>
                            </>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default CourseContent