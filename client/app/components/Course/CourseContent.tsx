import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react';
import Loader from '../loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseContentMedia from "./CourseContentMedia"
import CourseContentList from './CourseContentList';
type Props = {
    id: string;
};

const CourseContent = ({ id }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0)
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState("Login");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: contentData, isLoading, error } = useGetCourseContentQuery({ id });
    console.log(contentData);
    const data = contentData?.data[0];



    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header
                        activeItem={1}
                        open={open}
                        setOpen={setOpen}
                        route={route}
                        setRoute={setRoute}
                    />
                    <Heading
                        title={`${data[activeVideo]?.title} - ELearning`}
                        description="ELearning is a programming community developed by passionate developers."
                        keywords={data?.tags || []}
                    />
                    <div className="col-span-7">
                        <CourseContentMedia
                            id={id}
                            activeVideo={activeVideo}
                            setActiveVideo={setActiveVideo}
                            data={data}
                        />
                    </div>
                    <div className="hidden md:block md:col-span-3">
                        <CourseContentList
                            setActiveVideo={setActiveVideo}
                            data={data}
                            activeVideo={activeVideo}
                            isDemo={false}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default CourseContent;
