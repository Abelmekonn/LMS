import React from 'react'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import OrderAnalytics from '../../../app/components/Admin/Analytics/OrderAnalytics'
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
                    <OrderAnalytics isDashboard={false} />
                </AdminLayout>
            </AdminProtected>
        </>
    )
}

export default page