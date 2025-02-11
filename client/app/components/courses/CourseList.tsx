import React, { useEffect, useState } from "react";
import Heading from "../../utils/Heading";
import { styles } from "../../styles/style";
import CourseCard from "../../components/Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import Loader from "../../components/loader";

type Props = {}

const CourseList = (props: Props) => {
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string | null>(null);

    useEffect(() => {
        setSearch(searchParams?.get("title") ?? "");
    }, [searchParams]);

    const { data, isLoading, error } = useGetUsersAllCoursesQuery({});
    const { data: categoryData, isLoading: categoryLoading, error: categoryError } =
        useGetHeroDataQuery("categories", { refetchOnMountOrArgChange: true });

        const debounce = (func: Function, delay: number) => {
            let timeoutId: NodeJS.Timeout;
            return (...args: any[]) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        };
    
        const handleSearch = debounce((searchTerm: string) => {
            if (searchTerm && data?.data) {
                setCourses(
                    data.data.filter(
                        (course: any) =>
                            course.title &&
                            course.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            } else if (category === "All") {
                setCourses(data?.data || []);
            } else if (category !== "All" && data?.data) {
                setCourses(data.data.filter((course: any) => course.categories === category));
            }
        }, 300);
    
        useEffect(() => {
            handleSearch(searchTerm);
        }, [searchTerm, category, data, handleSearch]);
    
        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    handleSearch(searchTerm);
                }
            };
    
            window.addEventListener("keydown", handleKeyDown);
    
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [searchTerm, handleSearch]);
    
        const categories = categoryData?.layout?.categories;
    
        if (isLoading || categoryLoading) {
            return <Loader />;
        }
    
        if (error || categoryError) {
            return (
                <div>
                    Error: {error && "message" in error ? error.message : "Something went wrong"}{" "}
                    {categoryError && "message" in categoryError ? categoryError.message : ""}
                </div>
            );
        }
    return (
        <div className="w-[95%] md:w-[85%] m-auto min-h-[70vh]">
            <Heading
                title={"All courses - ELearning"}
                description={
                    "ELearning is a platform for students to learn and get help from teachers"
                }
                keywords={"Programming, MERN, Redux, Machine Learning"}
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
                <div
                    className={`h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                        }`}
                    onClick={() => setCategory("All")}
                >
                    All
                </div>
                {categories?.map((item: any, index: number) => (
                    <div key={index}>
                        <div
                            className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                            onClick={() => setCategory(item.title)}
                        >
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                    {searchTerm
                        ? `No course found with the title ${searchTerm}`
                        : "No course found in this category. Please try another one."}
                </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[30px]">
                {courses &&
                    courses.map((item: any, index: number) => (
                        <CourseCard key={index} item={item} isProfile={false} />
                    ))}
            </div>
        </div>
    )
}

export default CourseList