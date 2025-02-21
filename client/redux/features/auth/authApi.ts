import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data,
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({
                        token: result.data.activationToken,
                    }));
                } catch (error: any) {
                    console.log('Registration Error:', error);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activation_code, activation_token }) => ({
                url: 'activate-user',
                method: 'POST',
                body: {
                    activation_code,
                    activation_token
                }
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login-user",
                method: "POST",
                body: {
                    email,
                    password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result)
                    dispatch(userLogin({
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }));
                } catch (error: any) {
                    console.log('Login Error:', error);
                }
            },
        }),
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "social-auth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
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
                    console.log('Social Auth Error:', error);
                }
            },
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include", // Ensures cookies are included
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(userLogout()); // Clear user state on success
                    console.log("Logout successful");
                } catch (error) {
                    console.error("Logout Error:", error);
                }
            },
        }),
    })
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useActivationMutation,
    useSocialAuthMutation,
    useLogOutMutation,
} = authApi;
