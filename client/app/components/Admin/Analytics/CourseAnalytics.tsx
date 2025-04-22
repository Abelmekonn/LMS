"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetCourseAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import ThinLoader from "../../ThinLoader";

type Props = {
    isDashboard?: boolean;
};

const CourseAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetCourseAnalyticsQuery({});

    // Process analytics data
    const analyticsData =
        data?.courses?.last12Month?.map((item: any) => ({
            name: new Date(item.month).toLocaleString("en-US", { month: "short" }),
            count: item.count,
        })) || [];

    // Chart Configuration
    const chartConfig = {
        count: {
            label: "Courses",
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
                        <CardTitle className={isDashboard ? "text-lg" : "text-xl"}>Course Analytics</CardTitle>
                        <CardDescription>Last 12 months analytics data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsData.every((item: any) => item.count === 0) ? (
                            <div className="flex items-center justify-center h-[300px]">
                                <p className="text-center text-gray-500">
                                    No course activity in the last 12 months.
                                </p>
                            </div>
                        ) : (
                            <ChartContainer config={chartConfig} className={`${isDashboard ? "h-[270px]" : "h-[350px]"} w-full`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={analyticsData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 20,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="rgba(158, 158, 158, 0.1)"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgb(158, 158, 158)', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgb(158, 158, 158)', fontSize: 12 }}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                            contentStyle={{
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="hsl(var(--chart-2))"
                                            radius={[6, 6, 0, 0]}
                                            maxBarSize={50}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        )}
                    </CardContent>
                </>
            )}
        </Card>
    );
};

export default CourseAnalytics;