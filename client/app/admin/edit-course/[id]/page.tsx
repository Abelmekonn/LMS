'use client'
import React from 'react'
import AdminLayout from '../../../../app/components/Admin/adminLayout/AdminLayout'
import Heading from '../../../../app/utils/Heading'
import EditCourse from '../../../../app/components/Admin/Courses/EditCourse'

const page = ({params}:any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title="ELearning - Admin"
        description="Learning platform"
        keywords="ELearning, education"
      />
      <AdminLayout>
        <EditCourse id={id}/>
      </AdminLayout>
    </div>
  )
}

export default page
