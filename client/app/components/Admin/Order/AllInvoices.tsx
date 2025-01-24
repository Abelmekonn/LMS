"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import Loader from "../../loader";
import { AiOutlineMail } from "react-icons/ai";
import ThinLoader from "../../ThinLoader";

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

    const columns = [
        ...(isDashboard
            ? [{ field: "id", headerName: "ID", flex: 0.3 }]
            : [
                {
                    field: "id",
                    headerName: "ID",
                    flex: 1,
                },
                {
                    field: "Email",
                    headerName: "Full Email",
                    flex: 1,
                },
            ]),
        { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
            ? []
            : [
                { field: "title", headerName: "Course Title", flex: 1 },
                {
                    field: "emailAction",
                    headerName: "Email",
                    flex: 1,
                    renderCell: (params: any) =>
                        params.row.userEmail ? (
                            <a href={`mailto:${params.row.userEmail}`}>
                                <AiOutlineMail
                                    className={isDarkTheme ? "text-white" : "text-black"}
                                    size={20}
                                />
                            </a>
                        ) : null,
                },
            ]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard
            ? [{ field: "createdAt", headerName: "Created At", flex: 1 }]
            : []),
    ];

    return (
        <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
            {isLoading ? (
                <ThinLoader />
            ) : (
                <Box
                    m={isDashboard ? "0" : "40px"}
                    sx={{
                        "& .MuiDataGrid-root": {
                            backgroundColor: isDarkTheme ? "#363a89" : "#363a89",
                            border: "none",
                        },
                        "& .MuiDataGrid-row": {
                            color: isDarkTheme ? "#fff" : "#000",
                            borderBottom: isDarkTheme
                                ? "1px solid #363a89"
                                : "1px solid #363a89",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#4A90E2", // Change this to your desired color
                            color: isDarkTheme ? "#F1F1F1" : "#000",
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: isDarkTheme ? "#1F2A40" : "#F2F0F0",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "#363a89",
                            color: "#F1F1F1",
                            borderTop: "none",
                        },
                        "& .MuiCheckbox-root": {
                            color: isDarkTheme ? "#363a89" : "#363a89",
                        },
                    }}
                >
                    <DataGrid
                        rows={processedOrders}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 50]}
                        disableRowSelectionOnClick
                        checkboxSelection={!isDashboard}
                    />
                </Box>
            )}
        </div>
    );
};

export default AllInvoices;
