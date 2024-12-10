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
    },
    {
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Content Creator",
        comment: "A must-have tool for anyone looking to streamline their workflow.",
        rating: 4.5
    },
    {
        name: "Chris Wilson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Entrepreneur",
        comment: "This is the best platform I have used for my business.",
        rating: 5
    },
    {
        name: "Sophia Martinez",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Web Developer",
        comment: "The tools and features are incredibly intuitive. Great job!",
        rating: 2
    },
    {
        name: "James Anderson",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        profession: "Teacher",
        comment: "I use this every day, and it has been a game-changer for my work.",
        rating: 4
    },
    {
        name: "Isabella Taylor",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        profession: "Photographer",
        comment: "Superb functionality and easy to use. Highly satisfied!",
        rating: 5
    },
    {
        name: "David Lee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        profession: "Consultant",
        comment: "I've recommended this to my colleagues. Exceptional value!",
        rating: 4.5
    }
];


const image = "https://randomuser.me/api/portraits/men/5.jpg"


const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className="w-full md:flex items-center justify-center">
                <div className='md:w-[50%] flex justify-center w-full items-center '>
                    <Image
                        src={"https://randomuser.me/api/portraits/men/5.jpg"}
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem unde maiores quos eos! Laboriosam beatae praesentium soluta,
                        assumenda distinctio quos officiis obcaecati numquam,
                        voluptatem mollitia accusamus facilis, non repellat neque?
                    </p>
                </div>
                <br />
                <br />

            </div>
            <div className='grid mt-4 grid-cols-1 gap-[25px] md:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl-gap-[35px] mb-12 border-0 md:[&>*nth-child(6)]:!mt-[-40px]'>
                {reviews &&
                    reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                }
            </div>
        </div>
    )
}

export default Reviews