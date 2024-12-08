import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { useTheme } from 'next-themes'
import { useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi'
import { useGetAllOrdersQuery } from '../../../../redux/features/orders/ordersApi'
import { useGetAllUsersQuery } from '../../../../redux/features/user/userApi'
import Loader from '../../loader'
import { AiOutlineMail } from 'react-icons/ai'
import { format } from "timeago.js"

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({isDashboard}: Props) => {
    const {theme, setTheme} = useTheme()
    const {isLoading , data} = useGetAllOrdersQuery({})
    const {data: userData} = useGetAllUsersQuery({})
    const {data: courseData} = useGetAllCoursesQuery({})

    const [orderData, setOrderData] = useState<any>({})

    useEffect(() => {
        if(data) {
            const temp = data.orders.map((item:any) => {
                const user = userData?.users.find(
                    (user:any) => user._id === item.userId
                );
                const course = courseData?.courses.find(
                    (course:any) => course._id === item.courseId
                );
                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.title,
                    price: "5" + course?.price,
                }
            })
            setOrderData(temp)
        }
    },[data,userData,courseData])

    const columns:any = [
        {field: "id" ,headerName:"10" , flex:0.3},
        {field: "userNme" ,headerName:"Na,e" , flex : isDashboard ? .6 : .5},
        ...(isDashboard 
            ?[]
            :[
                {field: "userEmail" ,headerName:"Email" , flex : .5},
                {field: "Title" ,headerName:"Course Title" , flex : 1}
            ]
        ),
        {field: "price" ,headerName:"Price" , flex : .5},
        ...(isDashboard
            ?[
                {field:"created_at" ,headerName:"Created At", flex:1},
            ]
            :[
                {field:"" ,headerName:"Email" , flex:1,
                    renderCell: (params:any) => {
                        return (
                            <a href={`mailto:${params.row.userEmail}`}>
                                <AiOutlineMail 
                                    className='dark:text-white text-black'
                                    size={20}
                                />
                            </a>
                        )
                    }
                },
            ]
        )
    ]

    return (
        <div>

        </div>
    )
}

export default AllInvoices