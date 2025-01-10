import React from 'react';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">About</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline">
                                    Services
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="hover:underline">
                                    Courses
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:underline">
                                    My Account
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:underline">
                                    Course Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Info */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Social Info</h2>
                        <div className="space-y-2 flex flex-col gap-3 ">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500"
                            >
                                <AiFillFacebook size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                <AiFillTwitterCircle size={24} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500"
                            >
                                <AiFillInstagram size={24} />
                            </a>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Follow us on our social platforms to stay updated.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Contact Info</h2>
                        <p className="text-sm text-gray-400">
                            <strong>Email:</strong> support@yourbrand.com
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            <strong>Phone:</strong> +1 (123) 456-7890
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            <strong>Address:</strong> 123 YourBrand Street, City, Country
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
