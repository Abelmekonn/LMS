"use client"
import React from 'react'
import {BarChart,Bar,ResponsiveContainer,XAxis,Label,LabelList, YAxis} from "recharts"
import Loader from '../../loader'
import { useGetCourseAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'

type Props = {}

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetCourseAnalyticsQuery({})

  console.log(data)

  const analyticsData = [
    {name: "Jun 2023" , uv:3},
    {name: "Jul 2023" , uv:2},
    {name: "Aug 2023" , uv:4},
    {name: "Sep 2023" , uv:1},
    {name: "Oct 2023" , uv:5},
    {name: "Aug 2023" , uv:4},
    {name: "Sep 2023" , uv:1},
    {name: "Oct 2023" , uv:5},
  ]
  const minValue = 0;
  return (
    <>
      {
        isLoading ? (
          <Loader />
        ):(
          <div className='h-screen'>
            <div className="mt-[30px]">
              <h1 className={`${styles.title} py-5 !text-start`}>
                Course Analytics
              </h1>
              <p className={`${styles.label} py-5`}>
                Last 12 months analytics data{""}
              </p>
            </div>
            <div className='w-full h-[90%] flex items-center justify-center'>
              <ResponsiveContainer width="90%" height="50%" >
                <BarChart width={150} height={300} data={analyticsData}>
                  <XAxis dataKey="name">
                    <Label offset={0} position="insideBottom" />
                  </XAxis>
                  <YAxis domain={[minValue, 'auto']} />
                  <Bar dataKey="uv" fill="#3faf82">
                    <LabelList dataKey="uv" position="top"/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      }
    </>
  )
}

export default CourseAnalytics