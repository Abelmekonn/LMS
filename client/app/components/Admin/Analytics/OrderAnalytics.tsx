"use client";

import React from "react";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    CartesianGrid,
    Legend,
    Bar,
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
                                <BarChart
                                    data={analyticsData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis 
                                        dataKey="name" 
                                        label={{ value: "Month", position: "insideBottom", offset: -5 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <ChartTooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} content={<ChartTooltipContent />} />
                                    <Bar
                                        dataKey="count"
                                        fill="hsl(var(--chart-2))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </>
            )}
        </Card>
    );
};

export default OrderAnalytics;