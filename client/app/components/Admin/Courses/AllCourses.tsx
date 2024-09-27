'use client';

import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {};

const AllCourses = (props: Props) => {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'title', headerName: 'Course Title', flex: 1 },
        { field: "ratings", headerName: "Rating", flex: 0.5 },
        { field: 'purchase', headerName: 'Purchase', flex: 0.5 },
        { field: 'created_at', headerName: 'Created At', flex: 0.5 },
        {
            field: "actions",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => (
                <Button>
                    <AiOutlineDelete className="text-black dark:text-white" size={20} />
                </Button>
            )
        }
    ];

    const rows = [
        {
            id: "1234",
            title: "React",
            ratings: "4.5",
            purchase: "120",
            created_at: "12/12/12",
        }
    ];

    return (
        <div className='mt-[120px]'>
            <Box m="20px">
                <Box
                    m="40px 0 0"
                    height="80vh"
                    className="dark:text-white text-black"
                >
                    <DataGrid
                        checkboxSelection
                        rows={rows}
                        columns={columns}
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none"
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: "dark:text-[#fff] text-[#000]"
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: "dark:text-[#fff] text-[#000]"
                            },
                            "& .MuiDataGrid-row": {
                                color: "dark:text-[#fff] text-[#000]",
                                borderBottom: "border border-[#ccc] dark:border-[#ffffff30]"
                            },
                            "& .MuiTablePagination-root": {
                                color: "dark:text-[#fff] text-[#000]"
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: "dark:text-[#fff] text-[#000]"
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "dark:bg-black bg-[#A4A9FC]",
                                color: "dark:text-white text-black",
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "dark:bg-[#1F2A40] bg-[#F2F0F0]",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: "dark:bg-[#3e4396] bg-[#A4A9FC]",
                                color: "dark:text-white text-black",
                                borderTop: "none"
                            },
                            "& .MuiCheckbox-root": {
                                color: "dark:!text-[#b7ebde] !text-black",
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: "dark:text-white text-black",
                            }
                        }}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default AllCourses;
