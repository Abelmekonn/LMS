"use client"
import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Loader from '../../loader';
import { useDeleteUserMutation, useUpdateUserRoleMutation, useGetAllUsersQuery } from '../../../../redux/features/user/userApi';
import toast from 'react-hot-toast';
import { styles } from '../../../../app/styles/style';

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    courses: string[];
    createdAt: string;
};

type Props = {
    isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");

    const { theme } = useTheme();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [updateUserRole, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if (updateError) {
            toast.error(updateError.data?.message || "Failed to update user role");
        }

        if (updateSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
            resetForm();
        }

        if (deleteSuccess) {
            refetch();
            toast.success("User deleted successfully");
            setOpen(false);
        }
    }, [updateError, updateSuccess, deleteSuccess]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 0.5 },
        { field: 'role', headerName: 'Role', flex: 0.5 },
        { field: 'courses', headerName: 'Purchased Courses', flex: 0.5 },
        { field: 'created_at', headerName: 'Joined', flex: 0.5, renderCell: (params: any) => new Date(params.value).toLocaleDateString() },
        {
            field: 'deleteAction',
            headerName: 'Delete',
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => handleOpenDeleteModal(params.row.id)}>
                    <AiOutlineDelete className="text-black dark:text-white" size={20} />
                </Button>
            ),
        },
        {
            field: 'emailAction',
            headerName: 'Email',
            flex: 0.2,
            renderCell: (params: any) => (
                <a className='flex h-full' href={`mailto:${params.row.email}`}>
                    <AiOutlineMail className="text-black self-center dark:text-white" size={20} />
                </a>
            ),
        }
    ];

    const handleOpenDeleteModal = (id: string) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleDeleteUser = () => {
        if (selectedUserId) {
            deleteUser(selectedUserId);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = data?.allUsers?.find((item: User) => item.email === email);

        if (user) {
            try {
                await updateUserRole({ id: user._id, role });
                refetch();
                toast.success(`User role updated to ${role}`);
            } catch {
                toast.error("Failed to update user role");
            }
        } else {
            toast.error("User not found with the entered email");
        }
    };

    const resetForm = () => {
        setEmail("");
        setRole("admin");
    };

    const rows = Array.isArray(data?.allUsers)
        ? (isTeam ? data.allUsers.filter((item: User) => item.role === "admin") : data.allUsers)
            .map((item: User) => ({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: item.createdAt,
            }))
        : [];

    return (
        <div className='mt-[10px] text-black'>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m="20px">
                    <div className="w-full flex justify-end">
                        <div
                            className='!w-[180px] hover:bg-[#1d8161] bg-[#7679EE] text-center rounded-3xl py-2 cursor-pointer font-semibold text-white dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]'
                            onClick={() => setActive(prev => !prev)}
                        >
                            Add New Members
                        </div>
                    </div>

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

                    {active && (
                        <div className='dark:bg-[#575ba7] rounded-lg bg-[#575ba7] z-50 absolute top-[40%] w-[60%] md:w-[30%] left-1/2'>
                            <div className="flex flex-col w-full justify-center items-center p-5 gap-3">
                                <h2 className="text-lg text-white font-semibold ">Add New Member</h2>
                                <form onSubmit={handleSubmit} className="flex gap-3 w-full flex-col">
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className={`${styles.input} text-white`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="mb-3 text-white bg-[#575ba7] p-2 border rounded"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    <Button type="button" color="error" onClick={() => setActive(false)} className="mt-2">
                                        Close
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {open && (
                        <div className='dark:bg-[#575ba7] bg-[#575ba7] rounded-lg z-50 absolute top-[40%] w-[60%] md:w-[30%] left-1/2 translate-x-[-50%] p-5'>
                            <h2 className='text-lg text-white text-center'>Are you sure you want to delete this user?</h2>
                            <div className='flex justify-around mt-4'>
                                <Button onClick={handleDeleteUser} variant="contained" color="error">
                                    Delete
                                </Button>
                                <Button onClick={() => setOpen(false)} variant="contained" className="ml-2">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Overlay */}
                    {(open || active) && (
                        <div
                            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'
                            onClick={() => {
                                setOpen(false);
                                setActive(false);
                            }}
                        />
                    )}
                </Box>
            )}
        </div>
    );
};

export default AllUsers;
