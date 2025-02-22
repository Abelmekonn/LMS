import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getHeroData: builder.query({
            query :(type) => ({
                url : `get-layout/${type}`,
                method : 'GET',
                credentials : "include" as const 
            }),
            providesTags: [{ type: "Layouts" }],
            keepUnusedDataFor: 1000, // Cache data for 5 minutes
        }),
        editLayout: builder.mutation({
            query : ({type , image , title , subtitle , faq , categories }) => ({
                url : `edit-layout`,
                method : 'PUT',
                body : { type , image , title , subtitle , faq , categories },
                credentials : "include" as const
            })
        })
    })
})

export const {useGetHeroDataQuery,useEditLayoutMutation} = layoutApi;