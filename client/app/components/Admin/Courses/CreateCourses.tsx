import React, { useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData"
type Props = {}

const CreateCourses = (props: Props) => {
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        category: "",  // Ensure category exists
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
    });
    
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);  // Fixed the typo (setPrerequisites)
    const [courseContentData, setCourseContentData] = useState([{
        title: "",
        videoUrl: "",
        description: "",
        videoDescription: "",
        links: [
            {
                title: "",
                url: ""
            }
        ],
        suggestion: ""
    }]);

    const [courseData, setCourseData] = useState({});

    return (
        <div className='min-h-screen flex'>
            <div className='w-[80%]'>
                {active === 1 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 0 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
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
