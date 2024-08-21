"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
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
                <div className="flex h-[200hv]">
                    <div className="w-1/5 2xl:w-[16%]">
                        <AdminSidebar />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page