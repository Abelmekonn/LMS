import React, { FC, useEffect, useState } from 'react'
import UserAnalytics from '../Analytics/UserAnalytics';
import OrderAnalytics from '../Analytics/OrderAnalytics';
import AllInvoices from '../Order/AllInvoices'
import { useGetOrderAnalyticsQuery, useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import DashboardCards from '../AdminDashboard/DashboardCards';
import { Card } from '@/components/ui/card';
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";

type DashboardWidgetsProps = {
    open: boolean;
};

const DashboardWidgets: FC<DashboardWidgetsProps> = ({ open }) => {
    const [orderComparePercentage, setOrderComparePercentage] = useState<any>(undefined);
    const [userComparePercentage, setUserComparePercentage] = useState<any>();

    const { data: userAnalytics, isLoading, error } = useGetUserAnalyticsQuery({})
    const { data: orderAnalytics, isLoading: orderLoading, error: orderError } = useGetOrderAnalyticsQuery({});

    useEffect(() => {
        if (isLoading && orderLoading) {
            return
        } else {
            if (userAnalytics && orderAnalytics) {
                const userLastTwoMonths = userAnalytics.users.last12Month.slice(-2)
                const orderLastTwoMonths = orderAnalytics.orders.last12Month.slice(-2)

                if (userLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
                    const usersCurrentMonth = userLastTwoMonths[1].count;
                    const usersPreviousMonth = userLastTwoMonths[0].count;
                    const ordersCurrentMonth = orderLastTwoMonths[1].count;
                    const ordersPreviousMonth = orderLastTwoMonths[0].count;

                    const usersPercentChange =  usersPreviousMonth !== 0 ?
                        ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100;
                    
                    const ordersPercentChange = ordersPreviousMonth !== 0 ?
                        ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

                    setUserComparePercentage({
                        currentMonth: usersCurrentMonth,
                        previousMonth: usersPreviousMonth,
                        percentChange: usersPercentChange
                    });
                    setOrderComparePercentage({
                        currentMonth: ordersCurrentMonth,
                        previousMonth: ordersPreviousMonth,
                        percentChange: ordersPercentChange
                    })
                }
            }
        }
    }, [isLoading, orderLoading, userAnalytics, orderAnalytics])

    const ComparisonCard = ({ title, current, previous, percentChange, color }: {
        title: string;
        current: number;
        previous: number;
        percentChange: number;
        color: string;
    }) => (
        <Card className="bg-white/30 dark:bg-[#1a1f37]/40 backdrop-blur-md border-[1px] border-gray-200/20 dark:border-white/10 p-6">
            <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {current.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Previous: {previous.toLocaleString()}
                        </p>
                    </div>
                    <div className={`flex flex-col items-end ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <div className="flex items-center">
                            {percentChange >= 0 ? <IoTrendingUp className="w-6 h-6" /> : <IoTrendingDown className="w-6 h-6" />}
                            <span className="text-xl font-semibold ml-1">
                                {Math.abs(percentChange).toFixed(1)}%
                            </span>
                        </div>
                        <span className="text-sm mt-1">
                            {percentChange >= 0 ? 'Increase' : 'Decrease'}
                        </span>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                    <div 
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${Math.min(Math.abs(percentChange), 100)}%` }}
                    ></div>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="mt-[10px] min-h-screen pb-10">
            <DashboardCards 
                totalStudents={userComparePercentage?.currentMonth || 0}
                totalCourses={3}
                totalVideos={0}
                totalEarning={orderComparePercentage?.currentMonth || 0}
                studentGrowth={userComparePercentage?.percentChange || 0}
                courseGrowth={0}
                videoGrowth={0}
                earningGrowth={orderComparePercentage?.percentChange || 0}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-8">
                {userComparePercentage && (
                    <ComparisonCard
                        title="Monthly Users Growth"
                        current={userComparePercentage.currentMonth}
                        previous={userComparePercentage.previousMonth}
                        percentChange={userComparePercentage.percentChange}
                        color="bg-blue-500"
                    />
                )}
                {orderComparePercentage && (
                    <ComparisonCard
                        title="Monthly Orders Growth"
                        current={orderComparePercentage.currentMonth}
                        previous={orderComparePercentage.previousMonth}
                        percentChange={orderComparePercentage.percentChange}
                        color="bg-purple-500"
                    />
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[49%,49%]">
                <div className="mt-[30px]">
                    <UserAnalytics isDashboard={true} />
                </div>
                <div className="mt-[30px]">
                    <OrderAnalytics isDashboard={true} />
                </div>
            </div>
            
            <div className="mt-[30px]">
                <AllInvoices isDashboard={true} />
            </div>
        </div>
    );
};

export default DashboardWidgets;