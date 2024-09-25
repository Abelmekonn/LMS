import React, { useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview"
type CourseInfo = {
    name: string;
    description: string;
    price: string;
    estimatePrice: string;
    category: string;
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

const CreateCourses: React.FC = () => {
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        category: "",
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

    const handelSubmit = async () => {
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
            courseContent: formattedCourseContent,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
        };

        setCourseData(data);
    };

    const handelCourseCreate = async (e:any) =>{
        const data = courseData;
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
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen relative z-[-1] top-18 right-0">
                <CourseOption active={active} setActive={setActive} />
            </div>
        </div>
    );
}

export default CreateCourses;
