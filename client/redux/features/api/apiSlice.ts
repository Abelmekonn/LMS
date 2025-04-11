import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_SERVICE_URI || "http://localhost:5000"; // Default value

if (!BASE_URL) {
    console.error("Error: NEXT_PUBLIC_SERVICE_URI is not defined!");
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["CourseAnalytics", "OrderAnalytics", "UserAnalytics","AllCourses","Layouts"], 
    endpoints: (builder) => ({
        loadUser: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLogin({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    throw error;
                }
            },
        }),
    }),
});

export const { useLoadUserQuery } = apiSlice;
