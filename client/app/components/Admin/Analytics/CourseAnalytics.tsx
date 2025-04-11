"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  // Process analytics data
  const analyticsData =
    data?.courses?.last12Month?.map((item: any) => ({
      month: item.month.split(" ")[0], // Extract only month name (e.g., "Apr", "May")
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
    <Card className="bg-[#F9FAFB] dark:bg-[#111827]">
      {isLoading ? (
        <ThinLoader />
      ) : (
        <>
          <CardHeader>
            <CardTitle>Course Analytics</CardTitle>
            <CardDescription>Last 12 months analytics data</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsData.every((item : any ) => item.count === 0) ? (
              <p className="text-center text-gray-500">
                No course activity in the last 12 months.
              </p>
            ) : (
              <ChartContainer config={chartConfig} className="min-h-[450px]">
                <BarChart data={analyticsData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-count)" radius={8} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default CourseAnalytics;
