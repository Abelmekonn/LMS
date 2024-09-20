"use client";
import React, { FC, useState, useEffect } from 'react';
import Heading from '../utils/Heading'; // Update to match your directory structure
import AdminProtected from '../hooks/adminProtected'; // Update to match your directory structure
import AdminLayout from '../components/Admin/adminLayout/AdminLayout'; // Update to match your directory structure
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard/AdminDashboard';

const Page: FC = () => {


    return (
        <AdminProtected>
            <Heading
                title="ELearning - Admin"
                description="Learning platform"
                keywords="ELearning, education"
            />
            <AdminLayout >
                <AdminDashboard />
            </AdminLayout>
        </AdminProtected>
    );
};

export default Page;
