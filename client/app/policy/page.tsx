"use client";
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer';
import Policy from './Policy';

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login")
    return (
        <div>
            <Heading
                title={`Policy - ELearning`}
                description="Learning platform"
                keywords="ELearning, education"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <Policy />
            <Footer />
        </div>
    )
}

export default Page