"use client"
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import ThinLoader from "../../ThinLoader";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = {
    isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === "dark";

    const { isLoading, data: orderData } = useGetAllOrdersQuery({});
    const { data: userData } = useGetAllUsersQuery({});
    const { data: courseData } = useGetAllCoursesQuery({});

    const [processedOrders, setProcessedOrders] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(isDashboard ? 5 : 10);

    useEffect(() => {
        if (orderData && userData && courseData) {
            const temp = orderData.orders.map((item: any) => {
                const user = userData.allUsers.find(
                    (user: any) => user._id === item.userId
                );
                const course = courseData.courses.find(
                    (course: any) => course._id === item.courseId
                );
                return {
                    id: item._id, // Unique ID for the row
                    userName: user?.name || "N/A",
                    userEmail: user?.email || "N/A",
                    title: course?.title || "N/A",
                    price: `$${course?.price || "N/A"}`,
                    createdAt: item.createdAt,
                };
            });
            setProcessedOrders(temp);
        }
    }, [orderData, userData, courseData]);

    // Calculate the current page's data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = processedOrders.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Total pages
    const totalPages = Math.ceil(processedOrders.length / itemsPerPage);

    return (
        <div className={!isDashboard ? "mt-[20px] h-full" : "mt-[0px] w-full"}>
            {isLoading ? (
                <ThinLoader />
            ) : (
                <Card className="w-full px-3 py-3 dark:bg-[#111C43] ">
                    <div className="flex-col py-4">
                        <h5 className='dark:text-[#fff]  text-black text-[20px] font-[400] font-Poppins pb-3'>
                            Recent Transaction
                        </h5>
                        <Input placeholder="Filter emails..." className="max-w-sm" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                {isDashboard ? (
                                    <TableHead>Created At</TableHead>
                                ) : (
                                    <TableHead>Course Title</TableHead>
                                )}
                                {!isDashboard && <TableHead>Email</TableHead>}
                                {!isDashboard && <TableHead>Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell  className="line-clamp-1">{order.userName}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        {isDashboard ? (
                                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        ) : (
                                            <TableCell>{order.title}</TableCell>
                                        )}
                                        {!isDashboard && (
                                            <TableCell >
                                                <a href={`mailto:${order.userEmail}`}>
                                                    <AiOutlineMail className={isDarkTheme ? "text-white" : "text-black"} size={20} />
                                                </a>
                                            </TableCell>
                                        )}
                                        {!isDashboard && (
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
                                                            Copy payment ID
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>View customer</DropdownMenuItem>
                                                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <div>
                            Page {currentPage} of {totalPages}
                        </div>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AllInvoices;
