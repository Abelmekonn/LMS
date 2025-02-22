"use client"
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDeleteUserMutation, useUpdateUserRoleMutation, useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    courses: string[];
    createdAt: string;
};

const AllUsers: FC = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const [active, setActive] = useState(false);
    const { theme } = useTheme();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [updateUserRole, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if (updateError) {
            toast.error("Failed to update user role");
        }

        if (updateSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
            setEmail("");
            setRole("admin");
        }

        if (deleteSuccess) {
            refetch();
            toast.success("User deleted successfully");
        }
    }, [updateError, updateSuccess, deleteSuccess, refetch]);

    const rows = data?.allUsers?.map((user: User) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses.length,
        created_at: new Date(user.createdAt).toLocaleDateString(),
    })) || [];

    const columns = [
        {
            id: "name",
            header: "Name",
            accessor: "name",
        },
        {
            id: "email",
            header: "Email",
            accessor: "email",
        },
        {
            id: "role",
            header: "Role",
            accessor: "role",
        },
        {
            id: "courses",
            header: "Purchased Courses",
            accessor: "courses",
        },
        {
            id: "created_at",
            header: "Joined",
            accessor: "created_at",
        },
        {
            id: "actions",
            header: "Actions",
            cell: (row: any) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleDeleteUser(row.id)}>Delete</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateRole(row.id)}>Update Role</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const handleUpdateRole = (id: string) => {
        const user = data?.allUsers?.find((user: User) => user._id === id);
        if (user) {
            updateUserRole({ id, role });
        }
    };

    const handleDeleteUser = (id: string) => {
        deleteUser(id);
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

    return (
        <div className="mt-10 text-black">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="w-full flex justify-end">
                        <Button onClick={() => setActive(!active)}>Add New Members</Button>
                    </div>

                    <div className="overflow-x-auto mt-5">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHead key={column.id}>
                                            {column.header}
                                            {column.accessor && (
                                                <ArrowUpDown className="ml-2 cursor-pointer" />
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow key={row.id}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} className="dark:text-white ">
                                                {column.cell ? column.cell(row) : row[column.accessor]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {active && (
                        <div className="absolute top-[40%] w-[60%] md:w-[30%] left-1/2 z-50 transform -translate-x-1/2 p-5 bg-[#F9FAFB] dark:bg-[#212e4b] rounded-lg gap-3 shadow-xl">
                            <h2 className="dark:text-white text-lg font-semibold mb-3">Add New Member</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="dark:border-white"
                                />
                                <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded bg-white mb-2">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <div className="flex justify-evenly w-full">
                                    <Button type="submit">Submit</Button>
                                    <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={() => setActive(false)}>
                                        Close
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllUsers;
