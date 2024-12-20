import React, { useEffect, useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview"
import { useCreateCourseMutation } from '../../../../redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type CourseInfo = {
    name: string;
    description: string;
    price: string;
    estimatePrice: string;
    categories: string;
    tags: string;
    level: string;
    demoUrl: string;
    thumbnail: string;
    videoLength: number
};

type CourseContentData = {
    videoLength: any;
    title: string;
    videoUrl: string;
    description: string;
    videoDescription: string;
    videoSection: string;
    links: Array<{ title: string; url: string }>;
    suggestion: string;
};

const CreateCourses: React.FC = () => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Created Successfully")
            redirect('/admin/courses')
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)
            }
        }
    }, [isLoading, isSuccess, error])

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        categories: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
        videoLength: 0,
    });


    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState<CourseContentData[]>([{
        title: "",
        videoUrl: "",
        description: "",
        videoDescription: "",
        videoLength: "",
        videoSection: "Untitled Section",
        links: [{ title: "", url: "" }],
        suggestion: ""
    }]);

    const [courseData, setCourseData] = useState({});

    const handelSubmit = async () => {

        const formattedBenefit = benefits.map((benefit) => ({ title: benefit.title }));
        console.log("formattedBenefit", formattedBenefit)
        const formattedPrerequisite = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
        console.log("course content", courseContentData)
        // Map course content data to the expected format
        const formattedCourseContent = courseContentData.map((courseContent) => ({
            title: courseContent.title,
            videoUrl: courseContent.videoUrl,
            videoThumbnail: {},
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            videoLength: courseContent.videoLength,
            videoPlayer: "",
            links: courseContent.links.map((link) => ({ title: link.title, url: link.url })),
            suggestion: courseContent.suggestion,
            questions: [],
        }));

        console.log("formatted course content", formattedCourseContent)

        // Structure the final data object to send
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
            purchased: 0, // Default value for purchased
            categories: courseInfo.categories, // Add this line
        };

        console.log(data)

        setCourseData(data);
    };


    const handelCourseCreate = async (e: any) => {
        const data = courseData;

        if (!isLoading) {
            await createCourse(data)
        }
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
                        handelSubmit={handelSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handelCourseCreate={handelCourseCreate}
                        isEdit={false} />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen relative z-[-1] top-18 right-0">
                <CourseOption active={active} setActive={setActive} />
            </div>
        </div>
    );
}

export default CreateCourses;
