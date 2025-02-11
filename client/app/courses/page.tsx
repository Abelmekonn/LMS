"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CourseList from "../components/courses/CourseList";

type Props = {};

const Page = (props: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    


    return (
        <div className="min-h-screen">
            <Header
                route={route}
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
            />
            <CourseList />
        </div>
    );
};

export default Page;
