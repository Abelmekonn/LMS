'use client'; // Indicates that this component will use client-side rendering

import React from 'react'; // Importing React
import { DataGrid } from "@mui/x-data-grid"; // Importing DataGrid from MUI for displaying tabular data
import { Box, Button } from '@mui/material'; // Importing Box and Button from MUI for layout and buttons
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon from react-icons
import { useTheme } from 'next-themes'; // Importing useTheme hook for theme management

type Props = {}; // Defining Props type (currently not used)

const AllCourses = (props: Props) => {
    const theme = useTheme(); // Using the useTheme hook to get the current theme

    // Defining the columns for the DataGrid
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span> // Render ID
        },
        {
            field: 'title',
            headerName: 'Course Title',
            flex: 1,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span> // Render Course Title
        },
        {
            field: 'ratings',
            headerName: 'Rating',
            flex: 0.5,
            renderCell: (params: any) => (
                <span className='dark:text-white'>{params.value} </span> // Render Rating
            )
        },
        {
            field: 'purchase',
            headerName: 'Purchase',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{params.value}</span> // Render Purchase count
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 0.5,
            renderCell: (params: any) => <span className='dark:text-white'>{new Date(params.value).toLocaleDateString()}</span> // Render formatted date
        },
        {
            field: 'actions',
            headerName: 'Delete',
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => handleDelete(params.id)}> {/* Custom delete handler */}
                    <AiOutlineDelete className="text-black dark:text-white" size={20} /> {/* Delete icon */}
                </Button>
            )
        }
    ];

    // Example delete handler function
    const handleDelete = (id: number) => {
        // Implement your delete logic here, e.g., calling an API to delete the course
        console.log(`Delete course with ID: ${id}`);
    };

    // Sample data for rows (can be fetched from an API in a real application)
    const rows = [
        {
            id: "1234", // Course ID
            title: "React", // Course title
            ratings: "4.5", // Course rating
            purchase: "120", // Purchase count
            created_at: "12/12/12", // Creation date
        }
    ];

    return (
        <div className='mt-[10px] text-black dark:text-white'> {/* Margin top for spacing */}
            <Box m="20px"> {/* Main container box with margin */}
                <Box
                    m="40px 0 0" // Margin for top and bottom
                    height="80vh" // Height of the box
                    className="dark:text-white text-black" // Text color based on theme
                >
                    <DataGrid
                        checkboxSelection // Enable checkbox selection for rows
                        rows={rows} // Data rows to display in the grid
                        columns={columns} // Column definitions
                        sx={{ // Custom styles for DataGrid
                            "& .MuiDataGrid-root": {
                                background: "black", // Background color of the DataGrid
                                border: "none", // No border for the main grid
                                outline: "none" // No outline
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: " " // Sort icon color
                            },
                            "& .MuiDataGrid-row": {
                                color: "dark:text-[#fff] text-[#000]", // Row text color
                                borderBottom: "border border-#ccc dark:#ffffff30" // Row bottom border
                            },
                            "& .MuiTablePagination-root": {
                                color: "#F1F1F1" // Pagination color
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none", // No border for cells
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#363a89", // Header background color
                                color: "dark:text-white text-black", // Header text color
                                borderBottom: "none", // No bottom border
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "dark:bg-[#1F2A40] bg-[#F2F0F0]", // Scrolling area background
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: "#363a89", // Footer background color (same as header)
                                color: "#F1F1F1", // Footer text color
                                borderTop: "none" // No top border
                            },
                            "& .MuiCheckbox-root": {
                                color: "dark:!text-[#b7ebde] !text-black", // Checkbox color
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: "dark:text-white text-black", // Toolbar button text color
                            }
                        }}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default AllCourses; // Exporting the AllCourses component
