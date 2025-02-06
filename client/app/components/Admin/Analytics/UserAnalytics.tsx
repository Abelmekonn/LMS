"use client"
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, LabelList, YAxis, AreaChart, Tooltip, Area } from "recharts"
import Loader from '../../loader'
import { useGetUserAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'
import ThinLoader from '../../ThinLoader'

type Props = {
    isDashboard: boolean
}

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading, error } = useGetUserAnalyticsQuery({})
    const analyticsData : any = []
    console.log(data)
    data && 
        data.users.last12Month.forEach((items : any) => {
            analyticsData.push({ name: items.month, count: items.count })
        })

    return (
        <>
            {
                isLoading ? <ThinLoader /> : (
                    <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"}`}>
                        <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
                            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} pc-5 !text-start`}>
                                User Analytics
                            </h1>
                            {
                                isDashboard && (
                                    <p className={`${styles.label} px-5`}>
                                        Last 12 month analytics data{" "}
                                    </p>
                                )
                            }
                        </div>
                        <div className={`w-[90%] mx-auto ${isDashboard ? 'h-[30vh]' : 'h-auto mt-10'} flex items-center justify-center`}>
                            <ResponsiveContainer width={isDashboard ? '100%' : '90%' } height={!isDashboard ? "50%" : "100%"}>
                                <AreaChart 
                                    data={analyticsData}
                                    margin={{ 
                                        top: 5, 
                                        right: 30, 
                                        left: 5, 
                                        bottom:0
                                    }}
                                >
                                    <XAxis dataKey="name"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Area 
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#4d62d9"
                                        fill="#4d62d9"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserAnalytics