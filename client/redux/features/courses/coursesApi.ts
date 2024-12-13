import { apiSlice } from "../api/apiSlice";
export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-admin-course",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`, // Ensure id is used here correctly
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),
        getUsersAllCourses:builder.query({
            query: () => ({
                url : "get-courses",
                method : "GET" , 
                credentials : "include" as const
            })
        }),
        getCourseDetail:builder.query({
            query: () => ({
                url : `get-courses/:${id}`,
                method : "GET" , 
                credentials : "include" as const
            })
        })
    })
})

export const { 
    useCreateCourseMutation, 
    useGetAllCoursesQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetUsersAllCoursesQuery,
    useGetCourseDetailQuery
} = courseApi;
