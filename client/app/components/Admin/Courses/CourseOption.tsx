import React, { FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (active: number) => void;
};

const CourseOption: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];

    return (
        <div>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`w-full  flex py-4 gap-1`}
                >
                    <div
                        className={`relative w-[35px] h-[35px] rounded-full items-center flex justify-center ${active + 1 > index ? "bg-blue-500 text-white" : "bg-[#384766]"
                            }`}
                    >
                        <IoMdCheckmark className='text-[25px] m-2' />
                        {
                            index !== options.length -1 && (
                                <div
                                    className={`absolute h-[35px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                                        } bottom-[-100%]`}
                                >
                                </div>
                            )
                        }
                    </div>
                    <h5
                        className={`pl-3 ${active === index
                                ? "dark:text-white text-black"
                                : "dark:text-white text-black"
                            }`}
                    >
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    );
};

export default CourseOption;
