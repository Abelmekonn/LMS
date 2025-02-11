import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken ?? ""; // Ensure accessToken is a string
            }
            return token;
        },
        async session({ session, token }) {
            if (typeof token.accessToken === "string") {
                session.accessToken = token.accessToken; // Assign only if it's a string
            } else {
                session.accessToken = ""; // Default to empty string to prevent errors
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
};

export default NextAuth(authOptions);
