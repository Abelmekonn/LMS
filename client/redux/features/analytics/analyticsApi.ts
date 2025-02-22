import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseAnalytics: builder.query({
            query: () => ({
                url: "get-courses-analytics",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: [{ type: "CourseAnalytics" }],
            keepUnusedDataFor: 300, // Cache data for 5 minutes
        }),
        getOrderAnalytics: builder.query({
            query: () => ({
                url: "get-orders-analytics",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: [{ type: "OrderAnalytics" }],
            keepUnusedDataFor: 300,
        }),
        getUserAnalytics: builder.query({
            query: () => ({
                url: "get-users-analytics",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: [{ type: "UserAnalytics" }],
            keepUnusedDataFor: 300,
        }),
    }),
});

export const {
    useGetCourseAnalyticsQuery,
    useGetUserAnalyticsQuery,
    useGetOrderAnalyticsQuery,
} = analyticsApi;
