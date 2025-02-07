import NextAuth, { NextAuthOptions, Session, User as NextAuthUser  } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// Extend the NextAuth User type
interface User extends NextAuthUser  {
    accessToken?: string; // Add accessToken property
}

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
    debug: process.env.NODE_ENV === 'development',

    callbacks: {
        async jwt({ token, user }) {
            // Add user information to the token
            if (user) {
                token.accessToken = user.accessToken; // Now TypeScript recognizes accessToken
            }
            return token;
        },
        async session({ session, token }) {
            // Add token information to the session
            if (token) {
                session.accessToken = token.accessToken; // Now TypeScript recognizes accessToken
            }
            return session;
        },
    },

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
    },
};

export default NextAuth(authOptions);