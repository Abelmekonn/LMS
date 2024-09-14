"use client";
import React, { FC, ReactNode } from 'react'; // Import ReactNode for typing children
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { useSelector } from 'react-redux';

interface AdminLayoutProps {
    children: ReactNode; // Define the type for children
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    const { user } = useSelector((state: any) => state.auth);
    return (
        <div className="flex h-screen">
            {/* Sidebar */}

            <div className="fixed z-50 top-0   bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                <AdminHeader user={user} />
            </div>
            {/* Main Content Area */}
            <div className="flex  flex-1 ">
                {/* Header */}

                    <AdminSidebar />
                
                {/* Page Content */}
                <main className="pt-16 px-10 pb-4 mt-16 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
