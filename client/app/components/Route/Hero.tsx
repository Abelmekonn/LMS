import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useCallback, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../loader";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { IoCheckmarkDone } from "react-icons/io5";

type Props = {};
const courses = [
    { name: "Frontend Development", type: "plus" },
    { name: "Backend Development", type: "plus" },
    { name: "Fullstack Engineering", type: "plus" },
    { name: "Mobile App Development", type: "minus" },
    { name: "DevOps & CI/CD", type: "plus" },
    { name: "Cloud Computing", type: "minus" },
    { name: "UI/UX Design", type: "plus" },
    { name: "Data Science", type: "minus" },
    { name: "Machine Learning", type: "plus" },
    { name: "Cybersecurity", type: "minus" },
    { name: "Digital Marketing", type: "plus" },
    { name: "Product Management", type: "plus" },
]

export const Hero: FC<Props> = (props) => {
    const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });
    const [search, setSearch] = React.useState("");
    const router = useRouter();

    const handleSearch = useCallback(() => {
        if (search === "") {
            return;
        } else {
            router.push(`/courses?title=${search}`);
        }
    }, [search, router]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSearch]);

    const repeatedCourses = [...courses, ...courses];


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full mt-5 mb-10 flex flex-col-reverse justify-evenly md:flex-row items-center dark:bg-gradient-to-b text-black dark:text-white">
                        {/* Image Container */}
                        <div className='p-4 md:p-8 flex justify-center md:w-[40%] mt-10'>
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='md:w-[200px] md:h-[200px] w-[150px] h-[150px] rounded-full overflow-hidden'>
                                    <Image
                                        src={'/assets/images/boy.jpg'}
                                        alt=''
                                        width={200}
                                        height={200}
                                        className='object-cover'
                                    />
                                </div>
                                <div className='md:w-[200px] md:h-[200px] w-[150px] h-[150px] left-round overflow-hidden'>
                                    <Image
                                        src={'/assets/images/boy2.jpg'}
                                        alt=''
                                        width={200}
                                        height={200}
                                        className='object-cover'
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-4'>
                                <div className='md:w-[200px] md:h-[200px] w-[150px] h-[150px] right-round overflow-hidden'>
                                    <Image
                                        src={'/assets/images/girl2.jpg'}
                                        alt=''
                                        width={200}
                                        height={200}
                                        className='object-fill'
                                    />
                                </div>
                                <div className='md:w-[200px] md:h-[200px] w-[150px] h-[150px] rounded-full overflow-hidden'>
                                    <Image
                                        src={'/assets/images/girl.jpg'}
                                        alt=''
                                        width={200}
                                        height={200}
                                        className='object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Text Container */}
                        <div className="md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left mt-[50px] md:mt-[60px] px-4 md:px-0">
                            <h2 className="dark:text-white text-[#000000c7] text-[30px]  md:text-[60px] font-Josefin pt-2 leading-snug md:leading-[75px] ">
                                {data?.layout?.banner.title}
                            </h2>
                            <br />
                            <p className="dark:text-[#cdfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%]">
                                {data?.layout?.banner.subTitle}
                            </p>
                            <br /><br />
                            <div className="1500px:w-[55%] 1100px:w-[70%] w-[92%] h-[50px] bg-transparent relative mt-[-35px]">
                                <input type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent border dark:border:none dark:bg-[#575757] dark:text-[#ffffffdd] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full outline-none text-[#0000004c] dark:text[#ffffffe6] text-[20px] font-[500] font-Josefin"
                                    placeholder="Search courses...."
                                />
                                <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[48px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                                    onClick={handleSearch}
                                >
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
                            <div className="grid grid-cols-3 gap-4 mt-5">
                                <div className="dark:text-green-500 text-[crimson] flex gap-2 items-center"><IoCheckmarkDone size={20} />Free Courses</div>
                                <div className="dark:text-green-500 text-[crimson] flex gap-2 items-center"><IoCheckmarkDone size={20} />Flexible Payment</div>
                                <div className="dark:text-green-500 text-[crimson] flex gap-2 items-center"><IoCheckmarkDone size={20} />Mentor Support</div>
                            </div>
                        </div>
                    </div>
                    {/* courses slider like flutter, react, etc only name  */}
                    <div className="course-ticker">
                        <ul>
                            {repeatedCourses.map((course, idx) => (
                                <li key={`a-${idx}`} className={course.type}>
                                    <Badge
                                        className={`text-base px-4 py-2 rounded-full whitespace-nowrap dark:bg-gray-500 dark:text-white`}
                                    >
                                        {course.name}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                        <ul aria-hidden="true">
                            {repeatedCourses.map((course, idx) => (
                                <li key={`b-${idx}`} className={course.type}>
                                    <Badge
                                        className={`text-base px-4 py-2 rounded-full whitespace-nowrap dark:bg-gray-500 dark:text-white`}
                                    >
                                        {course.name}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};
