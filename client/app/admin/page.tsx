"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
import AdminLayout from '../components/Admin/adminLayout/AdminLayout'
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning  -Admin "
                    description="Learning platform"
                    keywords="ELearning, education"
                />
                <AdminLayout>
                    
                </AdminLayout>
            </AdminProtected>
        </div>
    )
}

export default page