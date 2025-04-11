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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ThinLoader from "../../ThinLoader";
import { useGetOrderAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { TrendingUp } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
            name: new Date(item.month).toLocaleString("en-US", { month: "short" }),
            count: item.count,
        })) || [];

    if (error) {
        return (
            <div className="text-red-500">
                Error loading analytics data. Please try again later.
            </div>
        );
    }
    const chartConfig = {
            count: {
                label: "Orders",
                color: "hsl(var(--chart-2))",
            },
        } satisfies ChartConfig;

    return (
        <Card className={`${isDashboard ? "h-[400px]" : "h-[500px]"} w-full bg-[#F9FAFB] dark:bg-[#111827] shadow-lg`}>
            {isLoading ? (
                <ThinLoader />
            ) : (
                <>
                    <CardHeader className={isDashboard ? "px-4 py-3" : "p-5"}>
                        <CardTitle className={isDashboard ? "text-lg" : "text-xl"}>Order Analytics</CardTitle>
                        {isDashboard && <CardDescription>Last 12 months analytics data</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className={`${isDashboard ? "h-[270px]" : "h-[350px]"} w-full`}>
                            <ResponsiveContainer width={isDashboard ? "100%" : "90%"} height={!isDashboard ? "50%" : "100%"}>
                                <LineChart
                                    data={analyticsData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid stroke="transparent" />
                                    <XAxis dataKey="name" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                                    <YAxis />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="hsl(var(--chart-2))"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </>
            )}
        </Card>
    );
};

export default OrderAnalytics;
