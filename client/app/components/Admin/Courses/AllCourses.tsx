'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes'; 
import { Button } from '@/components/ui/button'; // ShadCN Button component
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import moment from 'moment';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../../loader'; // Assuming Loader is a separate component
import Link from 'next/link'; // For edit course link

type Props = {};

const AllCourses = (props: Props) => {
    const { theme } = useTheme(); 
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
    const [open, setOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const handleOpenDeleteModal = (id: number) => {
        setSelectedCourseId(id); 
        setOpen(true); 
    };

    const handleDelete = async () => {
        if (selectedCourseId) {
            await deleteCourse(selectedCourseId);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Course deleted successfully");
            setOpen(false); 
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
            title: item.name,
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
                <div className="overflow-x-auto mt-5">
                    <table className="w-full table-auto border-collapse dark:text-white">
                        <thead>
                            <tr className='border-b-[1px] border-gray-300'>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Course Title</th>
                                <th className="px-4 py-2 text-left">Rating</th>
                                <th className="px-4 py-2 text-left">Purchase</th>
                                <th className="px-4 py-2 text-left">Created At</th>
                                <th className="px-4 py-2 text-left">Edit</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row : any) => (
                                <tr key={row.id} className='border-b-[1px] border-gray-300'>
                                    <td className="px-4 py-2">{row.id}</td>
                                    <td className="px-4 py-2">{row.title}</td>
                                    <td className="px-4 py-2">{row.ratings}</td>
                                    <td className="px-4 py-2">{row.purchase}</td>
                                    <td className="px-4 py-2">{moment(row.created_at).format('LL')}</td>
                                    <td className="px-4 py-2">
                                        <Link href={`/admin/edit-course/${row.id}`} passHref>
                                            <FiEdit2 className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                        <Button onClick={() => handleOpenDeleteModal(row.id)} variant="outline" color="red">
                                            <AiOutlineDelete size={20} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {open && (
                        <div className='dark:bg-[#575ba7] bg-[#575ba7] rounded-lg z-50 absolute top-[40%] w-[60%] md:w-[30%] left-1/2 translate-x-[-50%] p-5'>
                            <h2 className='text-lg text-white text-center'>Are you sure you want to delete this course?</h2>
                            <div className='flex justify-around mt-4'>
                                <Button onClick={handleDelete} variant="destructive" className="mr-2">
                                    Delete
                                </Button>
                                <Button onClick={() => setOpen(false)} variant="outline">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllCourses;
