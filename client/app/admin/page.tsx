"use client";
import React, { FC, useState, useEffect } from 'react';
import Heading from '../utils/Heading'; // Update to match your directory structure
import AdminProtected from '../hooks/adminProtected'; // Update to match your directory structure
import AdminLayout from '../components/Admin/adminLayout/AdminLayout'; // Update to match your directory structure
import AdminDashboard from '../components/Admin/AdminDashboard/AdminDashboard'; // Update to match your directory structure
import Students from '../components/Admin/AdminDashboard/Students'; // Update to match your directory structure
import Orders from '../components/Admin/AdminDashboard/Orders'; // Update to match your directory structure
import Settings from '../components/Admin/AdminDashboard/Settings'; // Update to match your directory structure
import Videos from '../components/Admin/AdminDashboard/Videos'; // Update to match your directory structure

import { useSearchParams } from 'next/navigation'; // Use 'next/navigation' to access query params in Next.js 13+

const Page: FC = () => {
    const searchParams = useSearchParams(); // Access query parameters using useSearchParams
    const [isMounted, setIsMounted] = useState(false);
    const [page, setPage] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);

        // Get the page parameter from the search params
        const pageParam = searchParams.get('page');
        if (pageParam) {
            setPage(pageParam);
        }
    }, [searchParams]); // React to changes in search params

    if (!isMounted) {
        // Render a loading state or nothing until the component is mounted
        return null;
    }

    let content;

    switch (page) {
        case 'dashboard':
            content = <AdminDashboard />;
            break;
        case 'students':
            content = <Students />;
            break;
        case 'orders':
            content = <Orders />;
            break;
        case 'settings':
            content = <Settings />;
            break;
        case 'videos':
            content = <Videos />;
            break;
        default:
            content = <div>Page not found</div>;
            break;
    }

    return (
        <AdminProtected>
            <Heading
                title="ELearning - Admin"
                description="Learning platform"
                keywords="ELearning, education"
            />
            <AdminLayout>
                {content}
            </AdminLayout>
        </AdminProtected>
    );
};

export default Page;
