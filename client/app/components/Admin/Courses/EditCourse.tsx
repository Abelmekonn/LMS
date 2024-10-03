'use client';
import React, { useEffect, useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
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

type Props = {
    id: string;
};

const EditCourse: React.FC<Props> = ({ id }) => {
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [createCourse, { isSuccess, isError, error }] = useCreateCourseMutation();

    console.log(data)

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

    const [courseData, setCourseData] = useState({});

    // Find the course with the matching id
    const editCourseData = data && Array.isArray(data.data)
        ? data.data.find((course: any) => course._id === id)
        : null;

    useEffect(() => {
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
        }
    }, [editCourseData]);
    

    const handleSubmit = async () => {
        const formattedBenefit = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisite = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        const formattedCourseContent = courseContentData.map((courseContent) => ({
            title: courseContent.title,
            videoUrl: courseContent.videoUrl,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({ title: link.title, url: link.url })),
            suggestion: courseContent.suggestion
        }));

        const data = {
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

        setCourseData(data);
    };

    const handleCourseCreate = async () => {
        const result = await createCourse(courseData);
        if (result.error) {
            const errorMessage = (result.error as any).data.message || "An error occurred";
            toast.error(errorMessage);
        } else {
            toast.success("Course Created Successfully");
            redirect('/admin/courses');
        }
    };

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
                        handleSubmit={handleSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
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
