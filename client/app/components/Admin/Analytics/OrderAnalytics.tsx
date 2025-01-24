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
import ThinLoader from "../../ThinLoader";

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
                <ThinLoader />
            ) : (
                <div className={isDashboard ? "h-[50vh]" : "h-screen"}>
                    <div
                        className={`${
                            isDashboard ? "mt-0 mb-2" : "mt-[50px]"
                        }`}
                    >
                        <h1
                            className={`${styles.title} ${
                                isDashboard && "!text-[20px]"
                            } px-5 !text-start mt-2`}
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
                                    left: 5,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
                                <XAxis dataKey="name" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                                <YAxis  />
                                <Tooltip />
                                {!isDashboard && <Legend />}
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#82ca9d"
                                    strokeWidth={2}
                                    dot={false}
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
