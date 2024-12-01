'use client';
import React, { FC, useState, useEffect } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/profiles/Profile';
import { useSelector } from 'react-redux';

type Props = {};

const Page: FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);

    // State to track if the component has mounted
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Render a loading state or nothing until the component is mounted
        return null;
    }

    return (
        <div className='h-screen'>
            <Protected>
                <Heading
                    title={`${user.name} profile`}
                    description="Learning platform"
                    keywords="elearning, education"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile user={user} />
            </Protected>
        </div>
    );
};

export default Page;
