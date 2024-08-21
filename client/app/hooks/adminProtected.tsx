import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
    children: ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
    const{user}=useSelector((state:any)=>state.auth)
    const isAdmin = user?.role === "admin"

    if(!isAdmin){
        return redirect('/')
    }
    // If isAdmin, render the children components
    return <>{children}</>;
}
