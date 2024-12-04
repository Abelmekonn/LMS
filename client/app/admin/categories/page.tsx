import React from 'react'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import EditCategories from '../../../app/components/Admin/Customization/EditCategories'

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
                    <EditCategories />
                </AdminLayout>
            </AdminProtected>
    </div>
  )
}

export default page