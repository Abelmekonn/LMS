import { useGetCourseDetailQuery } from '@/redux/features/courses/coursesApi'
import React, { useState } from 'react'
import Loader from '../loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'

type Props = {
    id: string
}

const CourseDetailPage = ({id}: Props) => {
    const [route , setRoute] = useState('Login')
    const [open , setOpen] = useState(false)
    const {data , isLoading} = useGetCourseDetailQuery({id})

    return (
        <>
        {
            isLoading ? (
                <Loader />
            ):(
                <div>
                    <Heading
                        title={data.course.name + "- ELearning"}
                        description={
                            "ELearning is a programming community which is developed by a group of passionate developers"
                        }
                        keywords={data?.course?.tags}
                    />
                    <Header 
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    <CourseDetails />
                </div>
            )
        }
        </>
    )
}

export default CourseDetailPage