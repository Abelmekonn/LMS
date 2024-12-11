import React from 'react';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Brand Section */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold">YourBrand</h2>
                        <p className="text-sm text-gray-400">
                            Simplifying solutions for a better tomorrow.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-4 text-sm mb-4 md:mb-0">
                        <a href="#home" className="hover:underline">
                            Home
                        </a>
                        <a href="#about" className="hover:underline">
                            About
                        </a>
                        <a href="#services" className="hover:underline">
                            Services
                        </a>
                        <a href="#contact" className="hover:underline">
                            Contact
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <AiFillFacebook size={24} className="hover:text-blue-500" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <AiFillTwitterCircle size={24} className="hover:text-blue-400" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <AiFillInstagram size={24} className="hover:text-pink-500" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
