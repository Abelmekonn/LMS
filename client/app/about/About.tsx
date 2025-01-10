"use client";
import React from 'react';

type Props = {};

const About = (props: Props) => {
    return (
        <div className="min-h-screen  dark:text-white text-black flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg mb-6">
                    Welcome to our eLearning platform! Our mission is to provide high-quality, accessible, and interactive educational content to learners worldwide. Whether you're looking to enhance your skills, explore new topics, or achieve your career goals, we're here to support you every step of the way.
                </p>
                <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
                <ul className="list-disc list-inside text-left mb-6">
                    <li>Comprehensive courses designed by industry experts.</li>
                    <li>Interactive learning with hands-on projects.</li>
                    <li>Flexible learning paths to suit your schedule.</li>
                    <li>Supportive community and expert guidance.</li>
                </ul>
                <p className="text-lg">
                    Join thousands of learners on their journey to success. Let's learn, grow, and achieve together!
                </p>
            </div>
        </div>
    );
};

export default About;
