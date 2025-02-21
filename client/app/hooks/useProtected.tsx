import { ReactNode } from "react";
import { redirect } from "next/navigation";
import useAuth from "./userAuth";
import toast from "react-hot-toast";

interface ProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const isAuthenticated = useAuth();

    // If not authenticated, redirect to the home page
    if (!isAuthenticated) {
        toast.error("Login To Access!")
        redirect("/");
    }

    // If authenticated, render the children components
    return <>{children}</>;
}
