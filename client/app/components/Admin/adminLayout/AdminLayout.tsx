"use client";
import React, { FC, ReactNode } from 'react'; // Import ReactNode for typing children
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../Sidebar/AdminSidebar';

interface AdminLayoutProps {
    children: ReactNode; // Define the type for children
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex w-full">
            {/* Sidebar */}
            <AdminSidebar />
            {/* Header */}
            <AdminHeader />
            {/* Page Content */}
            {children}

        </div>
    );
};

export default AdminLayout;
