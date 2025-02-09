import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import exp from "constants"
import build from "next/dist/build"
import { userLogin } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVICE_URI , credentials: "include" }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const
            })
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLogin({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }));
                } catch (error: any) {
                    throw new Error(error.message)
                }
            },
        })
    })
})

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice