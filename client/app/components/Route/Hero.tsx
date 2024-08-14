import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

export const Hero: FC<Props> = (props) => {
    return (
        <div className="w-full flex flex-col justify-evenly md:flex-row items-center dark:bg-gradient-to-b text-black dark:text-white">
            {/* Image Container */}
            <div className="mt-10 mx-[5%] relative top-[100px] md:top-[unset] w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px] lg:w-[450px] lg:h-[450px] hero_animation  rounded-full overflow-hidden flex items-center justify-center">
                <Image
                    src={require("../../../public/assets/10001.jpg")}
                    alt="Hero Image"
                    className="object-cover w-full h-full"
                    layout="fill"
                />
            </div>

            {/* Text Container */}
            <div className="md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left mt-[250px] md:mt-[60px] px-4 md:px-0">
                <h2 className="dark:text-white text-[#000000c7] text-[30px]  md:text-[60px] font-Josefin pt-2 leading-snug md:leading-[75px] ">
                    Improve your online Learning Experience Better Instance
                </h2>
                <br />
                <p className="dark:text-[#cdfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%]">
                    We have 40+ Online course & 500k+ online registered student. Find your
                    desired course from them.
                </p>
                <br /><br />
                <div className="1500px:w-[55%] 1100px:w-[70%] w-[92%] h-[50px] bg-transparent relative mt-[-35px]">
                    <input type="search"
                        className="bg-transparent border dark:border:none dark:bg-[#575757] dark:text-[#ffffffdd] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full outline-none text-[#0000004c] dark:text[#ffffffe6] text-[20px] font-[500] font-Josefin"
                        placeholder="Search courses...."
                    />
                    <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[48px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                        <BiSearch className="text-white" size={29} />
                    </div>
                </div>
                <br /><br />
                <div className="1500px:w-[55%] 1100px:w-[78%] w-[100%] flex items-center mt-[-30px]">
                    <Image 
                    src={require("../../../public/assets/pp.png")}
                    alt=""
                    className="rounded-full w-[50px] border-2 border-gray-700"
                    />
                    <Image 
                    src={require("../../../public/assets/pp.png")}
                    alt=""
                    className="rounded-full ml-[-20px] w-[50px] border-2 border-gray-700"
                    />
                    <Image 
                    src={require("../../../public/assets/pp.png")}
                    alt=""
                    className="rounded-full ml-[-20px] w-[50px] border-2 border-gray-700"
                    />
                    <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] w-[100%] 1000px:pl-3 text-[18px] font-[600] ml-2 ">
                        500K+ People already trusted us.{""}
                        <Link href={"/courses"} 
                        className="dark:text-[#46e256] text-[crimson]"
                        >
                            View Courses
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
