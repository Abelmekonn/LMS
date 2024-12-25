import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

type Props = {
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    data: any;
}

const CourseContentMedia = ({ id, activeVideo, setActiveVideo, data }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    return (
        <div className="w-[95%] 800px:w-[86%] mx-auto py-4">
            <CoursePlayer
                videoUrl={data[activeVideo]?.videoUrl}
                title={data[activeVideo]?.title}
            />
            <div className="w-full flex items-center justify-between  my-3">
                <div className={`${'flex flex-row justify-content-center min-w-fit item-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h min-h-[45px] text-[20px] font-Poppins font-semibold'} !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                    }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft size={30} className='mr-2 self-center' />
                    <span className='self-center'>Pre Lesson</span>
                </div>
                <div className={`${'flex flex-row justify-content-center min-w-fit  py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h min-h-[45px] text-[20px] self-center font-Poppins font-semibold'} !min-h-[40px] !py-[unset] ${activeVideo === data?.length - 1 && "!cursor-no-drop opacity-[.8]"
                    }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === data?.length - 1 ? data?.length - 1 : activeVideo + 1)
                    }
                >
                    <span className='self-center'>Next Lesson</span>
                    <AiOutlineArrowRight size={30} className='ml-2 self-center' />
                </div>
            </div>
            <h1 className="pt-2 text-[20px] dark:text-white text-black font-Poppins font-[600] ">
                {data[activeVideo]?.title}
            </h1>
            <br />
            <div className="w-full p-4 flex dark:text-white text-black items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"
                            }`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] dark:text-white text-black whitespace-pre-line mb-3">
                    {data[activeVideo]?.description}
                </p>
            )}
            {
                activeBar === 1 && (
                    <div>
                        {data[activeVideo]?.links?.map((item: any, index: number) => (
                            <div className="mb-5 flex gap-2" key={index}>
                                <h2 className="md:text-[20px] 800px:inline-block dark:text-white text-black">
                                    {item.title && item.title + " :"}
                                </h2>
                                <a href={item.url} className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                                    {item.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <div>
                        <h1>Q&A</h1>
                    </div>
                )
            }
        </div>
    )
}

export default CourseContentMedia