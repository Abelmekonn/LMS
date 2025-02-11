import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend NextAuth types
declare module "next-auth" {
    interface Session {
        accessToken?: string; // Add accessToken to Session
    }

    interface User extends DefaultUser {
        accessToken?: string; // Add accessToken to User
    }

    interface JWT {
        accessToken?: string; // Add accessToken to JWT
    }
}
