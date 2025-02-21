import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_SERVICE_URI ;

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
                    console.log("User loaded successfully:", result.data);

                    dispatch(
                        userLogin({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    console.error("Error fetching user data:", error);

                    // Ensure error is properly handled
                    const errorMessage = error?.message || "An unknown error occurred";
                    
                    // Optionally, dispatch an error action or handle logout here
                    // dispatch(userLogout());

                    throw new Error(errorMessage);
                }
            },
        }),
    }),
});

export const { useLoadUserQuery } = apiSlice;
