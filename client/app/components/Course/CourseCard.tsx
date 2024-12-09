import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

type Props = {
    item: any;
    isProfile: any;
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
            <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                <Image src={item.thumbnail.url} width={500} height={300} objectFit="contain" className='rounded-lg' alt='' />
                <br />
            </div>
        </Link>
    )
}

export default CourseCard