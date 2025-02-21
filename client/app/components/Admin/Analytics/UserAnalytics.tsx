"use client";

import { Area, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ThinLoader from "../../ThinLoader";
import { useGetUserAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { TrendingUp } from "lucide-react";

type Props = {
    isDashboard: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUserAnalyticsQuery({});

    // Process analytics data
    const analyticsData =
        data?.users?.last12Month?.map((item: any) => ({
            name: item.month.split(" ")[0], // Extract only the month name
            count: item.count,
        })) || [];

    // Chart Configuration
    const chartConfig = {
        count: {
            label: "Users",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <Card className={`${isDashboard ? "h-[400px]" : "h-[500px]"} w-full bg-[#F9FAFB] dark:bg-[#111827]`}>
            {isLoading ? (
                <ThinLoader />
            ) : (
                <>
                    <CardHeader className={`${isDashboard ? "px-4 py-3" : "p-5"}`}>
                        <CardTitle className={isDashboard ? "text-lg" : "text-xl"}>User Analytics</CardTitle>
                        {isDashboard && <CardDescription>Last 12 months analytics data</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        {analyticsData.every((item: any) => item.count === 0) ? (
                            <p className="text-center text-gray-400">No user activity in the last 12 months.</p>
                        ) : (
                            <ChartContainer config={chartConfig} className={`${isDashboard ? "h-[230px]" : "h-[350px]"}  w-full`}>
                                <AreaChart data={analyticsData} margin={{ top: 5, right: 30, left: 5, bottom: 0 }}>
                                    <CartesianGrid stroke="transparent" /> {/* Removes grid lines */}
                                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="count" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                                </AreaChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total user engagment for the last 12 months
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default UserAnalytics;
