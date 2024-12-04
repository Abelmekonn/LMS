import React from 'react'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import EditFqa from '../../../app/components/Admin/Customization/EditFqa'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - Admin"
                    description="Learning platform"
                    keywords="ELearning, education"
                />
                <AdminLayout>
                    <EditFqa />
                </AdminLayout>
            </AdminProtected>
        </div>
    )
}

export default page