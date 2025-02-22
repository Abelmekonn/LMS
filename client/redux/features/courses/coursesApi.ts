import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
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
                credentials: "include" as const,
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getUsersAllCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: [{ type: "AllCourses" }],
            keepUnusedDataFor: 1000, // Cache data for 5 minutes
        }),
        getCourseDetail: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `get-course/${id}`, // Ensure this matches the backend route
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getCourseContent: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `get-course-by-user/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }: { question: string, courseId: string, contentId: string }) => ({
                url: `add-question`,
                method: "PUT",
                body: { question, courseId, contentId },
                credentials: "include" as const,
            }),
        }),
        addAnswer: builder.mutation({
            query: ({ answer, courseId, contentId, questionId  }: { answer: string, courseId: string, contentId: string, questionId: string }) => ({
                url: `add-answer`,
                method: "PUT",
                body: { answer, courseId, contentId, questionId },
                credentials: "include" as const,
            }),
        }),
        addReview: builder.mutation({
            query: ({ rating, review, courseId }: { rating: number, review: string, courseId: string, contentId: string }) => ({
                url: `add-review/${courseId}`,
                method: "PUT",
                body: { rating, review },
                credentials: "include" as const,
            }),
        }),
        addReplyReview: builder.mutation({
            query: ({ reviewId, comment, courseId }: { reviewId: string, comment: string  , courseId:string}) => ({
                url: `add-reply`,
                method: "PUT",
                body: { reviewId, comment, courseId },
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { 
    useCreateCourseMutation, 
    useGetAllCoursesQuery, 
    useDeleteCourseMutation, 
    useEditCourseMutation, 
    useGetUsersAllCoursesQuery, 
    useGetCourseDetailQuery,
    useGetCourseContentQuery,
    useAddNewQuestionMutation,
    useAddAnswerMutation,
    useAddReviewMutation,
    useAddReplyReviewMutation
} = courseApi;
