import React from 'react'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import EditHero from "../../components/Admin/Customization/EditHero"
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
          <EditHero />
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page