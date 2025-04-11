import { Card } from "@/components/ui/card";
import { FaUserGraduate, FaBookOpen, FaDollarSign, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import React from "react";

type Props = {
    totalStudents: number;
    totalCourses: number;
    totalRevenue: number;
    totalRatings: number;
};

const DashboardCards = ({ totalStudents, totalCourses, totalRevenue, totalRatings }: Props) => {
    const cards = [
        { title: "Total Students", value: totalStudents, icon: <FaUserGraduate />, color: "bg-blue-400" , bg: "bg-blue-50" },
        { title: "Total Courses", value: totalCourses, icon: <FaBookOpen />, color: "bg-green-400", bg: "bg-green-50" },
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: <FaDollarSign />, color: "bg-yellow-400", bg: "bg-yellow-50" },
        { title: "Total Ratings", value: totalRatings.toFixed(1) + "/5", icon: <FaStar />, color: "bg-purple-400" , bg: "bg-purple-50" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  py-5">
            {cards.map((card, index) => (
                <Card key={index} className={`dark:bg-[#111C43] p-6 flex items-center justify-center  border-none rounded-sm`}>
                    <div className="flex flex-col justify-center  items-center space-y-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${card.color}`}>
                            {React.cloneElement(card.icon, { className: "text-2xl" })}
                        </div>
                        <div className="text-center"> 
                            <h3 className="text-[18px] text-gray-800 dark:text-gray-200 mb-4">{card.title}</h3>
                            <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{card.value}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default DashboardCards;
