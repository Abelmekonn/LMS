"use client";
import React from 'react';
import Boxes from '../common/Boxes';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the chart component to avoid SSR issues
const CourseMonthlyChart = dynamic(() => import('../common/StudentRegistrationsChart'), { ssr: false });

const AdminDashboard = () => {
    // Define course data with registration details
    const courses = [
        {
            name: 'React Basics',
            monthlyRegistrations: [10, 25, 15, 40, 20, 35, 30, 45, 25, 50, 20, 55],
        },
        {
            name: 'Node.js Masterclass',
            monthlyRegistrations: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
        },
        {
            name: 'Next.js Advanced',
            monthlyRegistrations: [12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122],
        },
    ];

    return (
        <div className="p-4">
            {/* Main Dashboard Section */}
            <div className="flex flex-wrap gap-6  mb-10">
                {/* Total Students Box */}
                <Boxes
                    title="Total Students"
                    value="500+"
                    icon={<SchoolIcon sx={{ fontSize: 40, color: 'blue' }} />}
                />

                {/* Total Courses Box */}
                <Boxes
                    title="Total Courses"
                    value="30"
                    icon={<MenuBookIcon sx={{ fontSize: 40, color: 'purple' }} />}
                />

                {/* Total Earnings Box */}
                <Boxes
                    title="Total Earnings"
                    value="$12,000"
                    icon={<AttachMoneyIcon sx={{ fontSize: 40, color: 'green' }} />}
                />
            </div>

            {/* Course Registration Charts */}
            <div>
                <Typography variant="h4" component="h1" gutterBottom className="text-black dark:text-white">
                    Course Registration Trends
                </Typography>

                {/* Grid layout for course registration charts */}
                <Grid container spacing={2}>
                    {courses.map((course, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                                <Typography className="text-black dark:text-white" variant="h6" gutterBottom>
                                    {course.name}
                                </Typography>
                                <CourseMonthlyChart
                                    courseName={course.name}
                                    monthlyRegistrations={course.monthlyRegistrations}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default AdminDashboard;
