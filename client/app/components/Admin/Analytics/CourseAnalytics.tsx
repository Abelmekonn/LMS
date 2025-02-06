"use client"
import React from 'react'
import {BarChart,Bar,ResponsiveContainer,XAxis,Label,LabelList, YAxis} from "recharts"
import Loader from '../../loader'
import { useGetCourseAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'

type Props = {}

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetCourseAnalyticsQuery({})


  const analyticsData : any = [];
  
  data && 
    data.courses.last12Month.forEach((item : any) => {
      analyticsData.push({name:item.month , uv : item.count})
    });

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
            <div className='w-full h-auto mt-10 flex items-center justify-center'>
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