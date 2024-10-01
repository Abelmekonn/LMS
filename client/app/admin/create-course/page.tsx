'use client'
import React from 'react'
import AdminLayout from '../../../app/components/Admin/adminLayout/AdminLayout'
import Heading from '../../../app/utils/Heading'
import CreateCourses from '../../../app/components/Admin/Courses/CreateCourses'

const page = () => {
  return (
    <div>
      <Heading
        title="ELearning - Admin"
        description="Learning platform"
        keywords="ELearning, education"
      />
      <AdminLayout>
        <CreateCourses />
      </AdminLayout>
    </div>
  )
}

export default page
