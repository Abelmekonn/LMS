'use client';
import React, { useEffect, useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type CourseInfo = {
    name: string;
    description: string;
    price: string;
    estimatePrice: string;
    tags: string;
    level: string;
    demoUrl: string;
    thumbnail: string;
};

type CourseContentData = {
    title: string;
    videoUrl: string;
    description: string;
    videoDescription: string;
    videoSection: string;
    links: Array<{ title: string; url: string }>;
    suggestion: string;
};

type CourseDataType = {
    name: string;
    description: string;
    price: string;
    estimatedPrice: string;
    tags: string;
    thumbnail: string;
    benefits: Array<{ title: string }>;
    prerequisites: Array<{ title: string }>;
    courseData: CourseContentData[];
    level: string;
    demoUrl: string;
    totalVideos: number;
};

type Props = {
    id: string;
};

const EditCourse: React.FC<Props> = ({ id }) => {
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [editCourse, { isSuccess, error }] = useEditCourseMutation({})
    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Edited Successfully")
            redirect('/admin/courses')
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error])
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
    });

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState<CourseContentData[]>([{
        title: "",
        videoUrl: "",
        description: "",
        videoDescription: "",
        videoSection: "Untitled Section",
        links: [{ title: "", url: "" }],
        suggestion: ""
    }]);

    const [courseData, setCourseData] = useState<CourseDataType | null>(null);

    useEffect(() => {
        if (!isLoading && data && Array.isArray(data.courses)) {
            const editCourseData = data.courses.find((course: any) => course._id === id);
            if (editCourseData) {
                setCourseInfo({
                    name: editCourseData.name,
                    description: editCourseData.description,
                    price: editCourseData.price,
                    estimatePrice: editCourseData.estimatedPrice,
                    tags: editCourseData.tags,
                    level: editCourseData.level,
                    demoUrl: editCourseData.demoUrl,
                    thumbnail: editCourseData?.thumbnail?.url
                });
                setBenefits(editCourseData.benefits);
                setPrerequisites(editCourseData.prerequisites);

                setCourseContentData(editCourseData.courseData);
                setCourseData(editCourseData); // Set course data here
            }
        }
    }, [isLoading, data, id]);

    const handleSubmit = () => {
        const formattedBenefit = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisite = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        const formattedCourseContent = courseContentData.map((courseContent) => ({
            title: courseContent.title,
            videoUrl: courseContent.videoUrl,
            description: courseContent.description,
            videoDescription: courseContent.videoDescription || "", // Default value if empty
            videoSection: courseContent.videoSection || "Untitled Section",
            links: courseContent.links.map((link) => ({ title: link.title, url: link.url })),
            suggestion: courseContent.suggestion,
        }));

        const data = {
            id, // Include course ID to ensure you're updating the correct course
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatePrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            benefits: formattedBenefit,
            prerequisites: formattedPrerequisite,
            courseData: formattedCourseContent,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
        };

        setCourseData(data); // Set the formatted course data
        setActive(3); // Move to the CoursePreview step
    };

    const handleCourseUpdate = async (e: any) => {
        if (courseData && !isLoading) {
            console.log("Updating Course");
            console.log("ID:", id); // This should show the correct ID
            console.log("Course Data:", JSON.stringify(courseData, null, 2)); // Log the course data structure
            await editCourse({ id, data: courseData });
        }
    };
    
    
    


    if (isLoading) {
        return <div>Loading...</div>; // Add a loading state
    }

    return (
        <div className='min-h-screen flex'>
            <div className='w-[80%]'>
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit} // Call handleSubmit to prepare course data
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData} // Pass the entire course data to preview
                        handelCourseCreate={handleCourseUpdate} // Use the updated handler
                        isEdit={true} // Indicate that this is an edit
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen relative z-[-1] top-18 right-0">
                <CourseOption active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default EditCourse;
