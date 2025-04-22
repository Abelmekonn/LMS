import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FaUserGraduate, FaBookOpen, FaVideo, FaDollarSign } from "react-icons/fa";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import React from "react";

type Props = {
    totalStudents?: number;
    totalCourses?: number;
    totalVideos?: number;
    totalEarning?: number;
    studentGrowth?: number;
    courseGrowth?: number;
    videoGrowth?: number;
    earningGrowth?: number;
};

const DashboardCards = ({
    totalStudents = 0,
    totalCourses = 0,
    totalVideos = 0,
    totalEarning = 0,
    studentGrowth = 0,
    courseGrowth = 0,
    videoGrowth = 0,
    earningGrowth = 0
}: Props) => {
    const formatNumber = (num: number) => {
        try {
            return num.toLocaleString();
        } catch {
            return '0';
        }
    };

    const cards = [
        {
            title: "Total Students",
            value: formatNumber(totalStudents),
            icon: <FaUserGraduate />,
            growth: studentGrowth,
            iconColor: "text-blue-500 dark:text-blue-400",
            bg: "bg-white/30 dark:bg-[#1a1f37]/40"
        },
        {
            title: "Total Course",
            value: formatNumber(totalCourses),
            icon: <FaBookOpen />,
            growth: courseGrowth,
            iconColor: "text-green-500 dark:text-green-400",
            bg: "bg-white/30 dark:bg-[#1a1f37]/40"
        },
        {
            title: "Total Video",
            value: formatNumber(totalVideos),
            icon: <FaVideo />,
            growth: videoGrowth,
            iconColor: "text-purple-500 dark:text-purple-400",
            bg: "bg-white/30 dark:bg-[#1a1f37]/40"
        },
        {
            title: "Total Earning",
            value: `$${formatNumber(totalEarning)}`,
            icon: <FaDollarSign />,
            growth: earningGrowth,
            iconColor: "text-yellow-500 dark:text-yellow-400",
            bg: "bg-white/30 dark:bg-[#1a1f37]/40"
        }
    ];

    return (
        <div>
            <Card className='card-bg bg-gradient-to-br from-[#1a1f37] to-[#111c43]'>
                <CardHeader className='text-3xl text-white font-heading'>
                    Good Morning, Abebe Debebe
                </CardHeader>
                <CardContent className='-mt-3'>
                    <CardDescription>
                        <p className='md:w-[50%] text-gray-100 font-normal text-base mb-6'>
                            Have nice day it seems like you are in the right place create appointment for your clients
                        </p>

                    </CardDescription>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:mt-[-30px] w-[90%] mx-auto">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        className={`${card.bg} backdrop-blur-sm border-[1px] border-white/10 transition-all duration-300 p-4`}
                    >
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-lg dark:text-gray-300 text-gray-950">{card.title}</span>
                                <div className={`${card.iconColor} text-xl p-3 rounded-full `}>
                                    {card.icon}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold dark:text-white text-black">
                                        {card.value}
                                    </span>
                                </div>
                                <div className={`flex items-center ${card.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {card.growth >= 0 ? <IoTrendingUp className="w-4 h-4" /> : <IoTrendingDown className="w-4 h-4" />}
                                    <span className="text-sm ml-1">{Math.abs(card.growth)}%</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardCards;