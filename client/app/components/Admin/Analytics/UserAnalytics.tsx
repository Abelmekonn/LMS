"use client"
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, LabelList, YAxis, AreaChart, Tooltip, Area } from "recharts"
import Loader from '../../loader'
import { useGetUserAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'

type Props = {
    isDashboard: true
}

const analyticsData = [
    { name: "january 2023", count: 404 },
    { name: "february 2023", count: 500 },
    { name: "march 2023", count: 600 },
    { name: "april 2023", count: 700 },
    { name: "may 2023", count: 800 },
    { name: "jun 2023", count: 900 },
    { name: "july 2023", count: 1000 },
    { name: "august 2023", count: 1100 },
    { name: "september 2023", count: 1200 },
]

const userAnalytics = ({ isDashboard }: Props) => {
    return (
        <>
            {
                isLoading ? <Loader /> : (
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
                        <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
                            <ResponsiveContainer width={isDashboard ? '100%' : '90%' } height={!isDashboard ? "50%" : "100%"}>
                                <AreaChart 
                                    data={analyticsData}
                                    margin={{ 
                                        top: 5, 
                                        right: 30, 
                                        left: 20, 
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

export default userAnalytics