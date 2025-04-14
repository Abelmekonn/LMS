import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

export const reviews = [
    {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Software Engineer",
        comment: "This platform has completely transformed the way I work. Highly recommended!",
        rating: 5
    },
    {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Graphic Designer",
        comment: "Amazing user experience and great customer support!",
        rating: 4.5
    },
    {
        name: "Alice Johnson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Project Manager",
        comment: "The features are top-notch and really user-friendly.",
        rating: 4
    },
    {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "Digital Marketer",
        comment: "I've seen significant improvement in my team's productivity. Thank you!",
        rating: 1
    }
];


const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] mx-auto my-10'>
            <div className="w-full md:flex items-center justify-center my-8">
                <div className='md:w-[50%] flex justify-center w-full items-center '>
                    <Image
                        src={"https://res.cloudinary.com/detxtubji/image/upload/v1736804961/3967400-removebg-preview_azodxn.png"}
                        alt="bussiness"
                        width={500}
                        height={300}
                    />
                </div>
                <div className="md:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="text-gradient bg-gradient-to-r from-[#427BFC] via-[#427BFC] to-[#2E3FAB] bg-clip-text text-transparent">Our Strength</span>{""}
                        <br />See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        We build a platform that helps students to learn and get help from teachers.
                        We are a team of 50+ people who are passionate about education and technology.
                        Helping students to learn and get help from teachers.

                    </p>
                </div>
                <br />
                <br />

            </div>
            <div className='flex gap-4 h-full items-stretch'>
                {reviews &&
                    reviews.map((i, index) => (
                        <div key={index} className="w-full ">
                            <ReviewCard item={i} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Reviews