import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: '/get-all-orders',
                method: 'GET',
                credentials: "include" as const
            })
        }),
        getStripPublishedKey: builder.query({
            query: () => ({
                url: "payment/stripepublishablekey",
                method: "GET",
                credentials: "include" as const
            })
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: "payment",
                method: "POST",
                body: {
                    amount, // Ensure this is a simple number, not an object
                },
                credentials: "include" as const,
            }),
        }),        
        createOrder: builder.mutation({
            query: ({courseId,payment_info,userId}) => ({
                url:"create-order",
                body: {
                    courseId,
                    payment_info,
                    userId
                },
                method: "POST",
                credentials: "include" as const
            })
        })
    })
})

export const { useGetAllOrdersQuery , useGetStripPublishedKeyQuery, useCreateOrderMutation, useCreatePaymentIntentMutation} = orderApi;