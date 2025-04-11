// components/Testimony.tsx

import React from 'react'
import Image from 'next/image'
import styles from './Testimony.module.css'

const testimonials = [
    {
        text: '"Absolutely amazing! Changed my workflow."',
        name: 'Jane Smith',
        img: 'https://randomuser.me/api/portraits/women/1.jpg',
        color: '142, 249, 252',
    },
    {
        text: '"A game-changer for my business. Highly recommend!"',
        name: 'John Doe',
        img: 'https://randomuser.me/api/portraits/men/2.jpg',
        color: '142, 252, 204',
    },
    {
        text: '"Totally worth the investment. My team loves it!"',
        name: 'Emily Taylor',
        img: 'https://randomuser.me/api/portraits/women/3.jpg',
        color: '142, 252, 157',
    },
    {
        text: '"Simple and effective – 10/10."',
        name: 'Michael Chen',
        img: 'https://randomuser.me/api/portraits/men/4.jpg',
        color: '215, 252, 142',
    },
    {
        text: '"Exceeded expectations!"',
        name: 'Sophia Lee',
        img: 'https://randomuser.me/api/portraits/women/5.jpg',
        color: '252, 252, 142',
    },
    // {
    //     text: '"Support is super helpful and fast."',
    //     name: 'Chris Kim',
    //     img: 'https://randomuser.me/api/portraits/men/6.jpg',
    //     color: '252, 208, 142',
    // },
    // {
    //     text: '"We saw instant improvements."',
    //     name: 'Anna Garcia',
    //     img: 'https://randomuser.me/api/portraits/women/7.jpg',
    //     color: '252, 142, 142',
    // },
    // {
    //     text: '"One of the best tools out there!"',
    //     name: 'David Wilson',
    //     img: 'https://randomuser.me/api/portraits/men/8.jpg',
    //     color: '252, 142, 239',
    // },
    // {
    //     text: '"Incredible UI and UX."',
    //     name: 'Linda Brown',
    //     img: 'https://randomuser.me/api/portraits/women/9.jpg',
    //     color: '204, 142, 252',
    // },
    // {
    //     text: '"Keeps getting better with updates."',
    //     name: 'Kevin White',
    //     img: 'https://randomuser.me/api/portraits/men/10.jpg',
    //     color: '142, 202, 252',
    // },
]

const Testimony = () => {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.inner}
                style={{ '--quantity': testimonials.length } as React.CSSProperties}
            >
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        style={
                            {
                                '--index': index,
                                
                            } as React.CSSProperties
                        }
                    >
                        <div className={styles.img}>
                            <div className={styles.testimonyText}>{item.text}</div>
                            <div className={styles.footer}>
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    className={styles.avatar}
                                    width={40}
                                    height={40}
                                />
                                <span className={styles.name}>{item.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimony
