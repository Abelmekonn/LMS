"use client";
import React, { FC, ReactNode } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex flex-row min-h-screen ">
            {/* Sidebar */}
            <aside className="flex-shrink-0">
                <AdminSidebar />
            </aside>
            {/* Main Content Area */}
            <div className="flex flex-col flex-1 !h-screen">
                <header>
                    <AdminHeader user={user} />
                </header>
                <main className="flex-1 overflow-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
