'use client'; // Indicates that this component will use client-side rendering

import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes'; // Importing useTheme hook for theme management
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../../loader';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import moment from 'moment';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {};

const AllCourses = (props: Props) => {
    const { theme } = useTheme(); // Get current theme
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
    const [open, setOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    console.log(data)

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
            renderCell: (params: any) => <span className='dark:text-white'>{moment(params.value).format('LL')}</span>,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            flex: 0.2,
            renderCell: (params: any) => (
                <a href={`/admin/edit-course/${params.row.id}`} className='flex h-full'>
                    <FiEdit2 className={theme === 'dark' ? 'text-white self-center' : 'text-black self-center '} size={20} />
                </a>
            ),
        },
        {
            field: 'actions',
            headerName: 'Delete',
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => handleOpenDeleteModal(params.id)}>
                    <AiOutlineDelete className="text-black dark:text-white" size={20} />
                </Button>
            ),
        }
    ];



    const handleOpenDeleteModal = (id: number) => {
        setSelectedCourseId(id); // Set the selected course ID for deletion
        setOpen(true); // Open the confirmation modal
    };

    const handleDelete = async () => {
        if (selectedCourseId) {
            await deleteCourse(selectedCourseId); // Trigger the delete mutation with selected course ID
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Course deleted successfully");
            setOpen(false); // Close the modal after deletion
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch]);

    const rows = Array.isArray(data?.courses)
        ? data.courses.map((item: any) => ({
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
                    {open && (
                        <div className='dark:bg-[#575ba7] bg-[#575ba7] rounded-lg z-50 absolute top-[40%] w-[60%] md:w-[30%] left-1/2 translate-x-[-50%] p-5'>
                            <h2 className='text-lg text-white text-center'>Are you sure you want to delete this course?</h2>
                            <div className='flex justify-around mt-4'>
                                <Button onClick={handleDelete} variant="contained" color="error">
                                    Delete
                                </Button>
                                <Button onClick={() => setOpen(false)} variant="contained" className="ml-2">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </Box>
            )}
        </div>
    );
};

export default AllCourses;
