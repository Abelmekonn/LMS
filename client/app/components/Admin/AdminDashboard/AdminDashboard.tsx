"use client";
import React, { useState } from 'react';
import Boxes from '../common/Boxes';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Dynamically import the chart component to avoid SSR issues
const CourseMonthlyChart = dynamic(() => import('../common/StudentRegistrationsChart'), { ssr: false });

const AdminDashboard = () => {
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
    
    const [date, setDate] = useState<Date | null>(new Date());

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    return (
        <LocalizationProvider >
            <div>
                <div className='md:flex justify-around items-start'>
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
                        title="Total Earn"
                        value="$12,000"
                        icon={<AttachMoneyIcon sx={{ fontSize: 40, color: 'green' }} />}
                    />
                </div>

                <div className='mt-10'>
                    <Typography variant="h4" component="h1" gutterBottom className='text-black dark:text-white'>
                        Course Registration
                    </Typography>
                    <Grid container spacing={2}>
                        {courses.map((course, index) => (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
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
        </LocalizationProvider>
    );
};

export default AdminDashboard;
