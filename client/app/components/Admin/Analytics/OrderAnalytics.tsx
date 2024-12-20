"use client";

import React from "react";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    CartesianGrid,
    Legend,
    Line,
} from "recharts";
import Loader from "../../loader";
import { useGetOrderAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

interface AnalyticsData {
    name: string;
    count: number;
}

type Props = {
    isDashboard: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading, error } = useGetOrderAnalyticsQuery({});

    // Transform data immutably
    const analyticsData: AnalyticsData[] =
        data?.orders?.last12Month?.map((item: any) => ({
            name: item.month,
            count: item.count,
        })) || [];

    if (error) {
        return (
            <div className="text-red-500">
                Error loading analytics data. Please try again later.
            </div>
        );
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
                    <div
                        className={`${
                            isDashboard ? "mt-0 pl-[40px] mb-2" : "mt-[50px]"
                        }`}
                    >
                        <h1
                            className={`${styles.title} ${
                                isDashboard && "!text-[20px]"
                            } px-5 !text-start`}
                        >
                            Order Analytics
                        </h1>
                        {isDashboard && (
                            <p className={`${styles.label} px-5`}>
                                Last 12 months analytics data
                            </p>
                        )}
                    </div>
                    <div
                        className={`w-full ${
                            isDashboard ? "h-[90%]" : "h-full"
                        } flex items-center justify-center`}
                    >
                        <ResponsiveContainer
                            width={isDashboard ? "100%" : "90%"}
                            height={!isDashboard ? "50%" : "100%"}
                        >
                            <LineChart
                                data={analyticsData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
                                <XAxis dataKey="name" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                                <YAxis label={{ value: "Orders", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                {!isDashboard && <Legend />}
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#82ca9d"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderAnalytics;
