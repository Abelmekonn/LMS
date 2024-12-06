import React from 'react'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import CourseAnalytics from '../../../app/components/Admin/Analytics/CourseAnalytics'
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
            <AdminLayout >
                <CourseAnalytics />
            </AdminLayout>
        </AdminProtected>
    </div>
  )
}

export default page