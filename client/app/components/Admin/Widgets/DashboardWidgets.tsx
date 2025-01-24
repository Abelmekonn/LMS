import React, { FC, useEffect, useState } from 'react'
import UserAnalytics from '../Analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUserLight } from "react-icons/pi";
import { Box, CircularProgress } from '@mui/material';
import OrderAnalytics from '../Analytics/OrderAnalytics';
import AllInvoices from '../Order/AllInvoices'
import { useGetOrderAnalyticsQuery, useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';


type Props = {
    open: boolean;
    value?: number
}

const CircleProgressWithLabel: FC<Props> = ({ open, value }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }} >
            <CircularProgress
                variant='determinate'
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            ></Box>
        </Box>
    )
}

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


    return (
        <div className="mt-[30px] min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[65%,35%]">
                <div className="md:p-8">
                    <UserAnalytics isDashboard={true} />
                </div>
                <div className="pt-[80px] pr-8">
                    <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <BiBorderLeft className='dark:text-[#45cBA0] text-[#000] text-[30px]' />
                                <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                    {orderComparePercentage?.currentMonth}
                                </h5>
                                <h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    Sales Detained
                                </h5>
                            </div>
                            <div>
                                <CircleProgressWithLabel value={
                                    orderComparePercentage?.percentChange > 0
                                    ? 100 
                                    : 0
                                } open={open} />
                                <h5 className='text-center pt-4'>
                                {
                                        orderComparePercentage?.percentChange > 0
                                            ? "+" + userComparePercentage?.percentChange.toFixed(2)
                                            : "" + userComparePercentage?.percentChange.toFixed(2)
                                    } %
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className='w-full dark:bg-[#111C43] rounded-sm shadow my-8'>
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <PiUserLight className="dark:text-[#45CBAD] text-[#000] text-[30px]" />
                                <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[30px]'>
                                    {userComparePercentage?.currentMonth}
                                </h5>
                                <h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    New User
                                </h5>
                            </div>
                            <div>
                                <CircleProgressWithLabel value={
                                    userComparePercentage?.percentChange > 0
                                    ? 100
                                    : 0
                                } open={open} />
                                <h5 className='text-center dark: pt-4'>
                                    {
                                        userComparePercentage?.percentChange > 0
                                            ? "+" + userComparePercentage?.percentChange.toFixed(2)
                                            : "" + userComparePercentage?.percentChange.toFixed(2)
                                    } %
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-[65%,35%] '>
                <div className="dark:bg-[#111c43] w-full md:w-[94%] mt-[30px] h-[60vh] shadow-sm m-auto">
                    <OrderAnalytics isDashboard={true} />
                </div>
                <div className="mt-[30px]">
                    <h5 className='dark:text-[#fff]  text-black text-[20px] font-[400] font-Poppins pb-3'>
                        Recent Transaction
                    </h5>
                    <AllInvoices isDashboard={true} />
                </div>
            </div>
        </div>
    )
}

export default DashboardWidgets