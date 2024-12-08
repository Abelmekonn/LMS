import React from 'react'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
import AdminLayout from '../../components/Admin/adminLayout/AdminLayout'
import AllInvoices from '@/app/components/Admin/Order/AllInvoices'
type Props = {}

const page = (props: Props) => {
    return (
        <>
            <AdminProtected>
                <Heading
                    title="ELearning - Admin"
                    description="Learning platform"
                    keywords="ELearning, education"
                />
                <AdminLayout>
                    <AllInvoices />
                </AdminLayout>
            </AdminProtected>
        </>
    )
}

export default page 