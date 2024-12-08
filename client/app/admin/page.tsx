"use client";
import React, { FC, useState, useEffect } from 'react';
import Heading from '../utils/Heading'; // Update to match your directory structure
import AdminProtected from '../hooks/adminProtected'; // Update to match your directory structure
import AdminLayout from '../components/Admin/adminLayout/AdminLayout'; // Update to match your directory structure
import DashboardHero from '../components/Admin/AdminDashboard/DashboardHero';

const Page: FC = () => {


    return (
        <AdminProtected>
            <Heading
                title="ELearning - Admin"
                description="Learning platform"
                keywords="ELearning, education"
            />
            <AdminLayout >
                <DashboardHero isDashboard = {true} />
            </AdminLayout>
        </AdminProtected>
    );
};

export default Page;
