'use client'; // Indicates that this component will use client-side rendering

import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes'; // Importing useTheme hook for theme management
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../../loader';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import moment from 'moment';

type Props = {};

const AllCourses = (props: Props) => {
    const { theme } = useTheme(); // Get current theme
    const { isLoading, data, error } = useGetAllCoursesQuery({});

    // Defining the columns for the DataGrid
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span>,
        },
        {
            field: 'title',
            headerName: 'Course Title',
            flex: 1,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span>,
        },
        {
            field: 'ratings',
            headerName: 'Rating',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span>,
        },
        {
            field: 'purchase',
            headerName: 'Purchase',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span>,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{new Date(params.value).toLocaleDateString()}</span>,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => handleEdit(params.row.id)}>
                    <FiEdit2 className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
                </Button>
            ),
        },
        {
            field: 'actions',
            headerName: 'Delete',
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => handleDelete(params.id)}>
                    <AiOutlineDelete className="text-black dark:text-white" size={20} />
                </Button>
            ),
        }
    ];

    const handleEdit = (id: number) => {
        console.log(`Edit course with ID: ${id}`);
        // Implement your edit logic here (e.g., navigate to the edit page)
    };

    const handleDelete = (id: number) => {
        console.log(`Delete course with ID: ${id}`);
        // Implement your delete logic here (e.g., API call to delete the course)
    };

    console.log(data)

    const rows = Array.isArray(data?.data)
    ? data.data.map((item: any) => ({
        id: item._id,
        title: item.name, // Field mappings according to your data
        ratings: item.ratings,
        purchase: item.purchased,
        created_at: item.createdAt, 
    }))
    : [];



    return (
        <div className='mt-[10px] text-black'>
            {isLoading ? (
                <Loader />
            ) : (
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
                                    backgroundColor: theme === 'dark' ? "#1F2A40" : "#F2F0F0",
                                    border: "none",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === 'dark' ? '#fff' : '#000',
                                    borderBottom: theme === 'dark' ? "1px solid #ffffff30" : "1px solid #ccc",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#363a89",
                                    color: theme === 'dark' ? "#000" : "#000",
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === 'dark' ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: "#363a89",
                                    color: "#F1F1F1",
                                    borderTop: "none",
                                },
                                "& .MuiCheckbox-root": {
                                    color: theme === 'dark' ? '#b7ebde' : '#000',
                                },
                                "& .MuiTablePagination-root": {
                                    color: "#F1F1F1",
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: theme === 'dark' ? "#fff" : "#000",
                                },
                            }}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AllCourses;
