"use client";
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from './About';
import Footer from '../components/Footer';

type Props = {
    open?: boolean;
    setOpen: (open?: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title={`About Us - ELearning`}
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
            <About />
            <Footer />
        </div> 
    )
}

export default Page