"use client";

import React, { FC, ReactNode } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useSelector } from "react-redux";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    const { user } = useSelector((state: { auth: { user: any } }) => state.auth);

    return (
        <div className="flex flex-row min-h-screen w-full bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-md">
                <AdminSidebar user={user}/>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-screen">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
                    <AdminHeader user={user} />
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
