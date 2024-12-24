import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react';
import Loader from '../loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';

type Props = {
    id: string;
};

const CourseContent = ({ id }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data:contentData, isLoading, error } = useGetCourseContentQuery({ id });
    console.log(contentData);
    const data = contentData?.data[0];
    

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Heading
                        title={`${data[activeVideo]?.title} - ELearning`}
                        description="ELearning is a programming community developed by passionate developers."
                        keywords={data?.tags || []}
                    />
                    
                </>
            )}
        </>
    );
};

export default CourseContent;
