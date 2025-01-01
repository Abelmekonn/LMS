import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react';
import Loader from '../loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseContentMedia from "./CourseContentMedia"
import CourseContentList from './CourseContentList';
type Props = {
    id: string;
    user: any;
};

const CourseContent = ({ id, user }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0)
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState("Login");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: contentData, isLoading, error, refetch } = useGetCourseContentQuery(
        { id }, 
        { refetchOnMountOrArgChange: true }
    );
    
    const data = contentData?.data[0];
    console.log(data)



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
                    <div className="w-full grid md:grid-cols-10">
                        <Heading
                            title={data && data[activeVideo] ? `${data[activeVideo].title} - ELearning` : "ELearning"}
                            description="ELearning is a programming community developed by passionate developers."
                            keywords={data?.tags || []}
                        />
                        <div className="col-span-7">
                            <CourseContentMedia
                                id={id}
                                activeVideo={activeVideo}
                                setActiveVideo={setActiveVideo}
                                data={data}
                                user={user}
                                refetch={refetch}
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
                    </div>
                </>
            )}
        </>
    );
};

export default CourseContent;
