"use client";
import React, { useState } from 'react'
import FAQ from '../components/Route/FAQ'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import Footer from '../components/Footer'

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login")
    return (
        <div className="min-h-screen">
            <Heading
                title={`FAQ  - ELearning`}
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
            <FAQ />
            <Footer />
        </div>
    )
}

export default Page