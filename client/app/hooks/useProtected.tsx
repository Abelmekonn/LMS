import { ReactNode } from "react";
import { redirect } from "next/navigation";
import useAuth from "./userAuth";

interface ProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const isAuthenticated = useAuth();

    // If not authenticated, redirect to the home page
    if (!isAuthenticated) {
        redirect("/");
    }

    // If authenticated, render the children components
    return <>{children}</>;
}
