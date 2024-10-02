import AdminDashboard from '../../../app/components/Admin/AdminDashboard/AdminDashboard'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AllUsers from '../../../app/components/Admin/Users/AllUsers'
import React from 'react'

type Props = {}

const page = (props:Props) => {
    return (
        <AdminProtected>
            <Heading
                title="ELearning - Admin"
                description="Learning platform"
                keywords="ELearning, education"
            />
            <AdminLayout >
                <AllUsers isTeam={true}/>
            </AdminLayout>
        </AdminProtected>
    )
}

export default page