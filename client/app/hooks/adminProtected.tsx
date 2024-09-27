"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        router.push("/"); // Client-side redirect
      }
    } else {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [user, router]);

  if (!user) return null; // Optionally, render a loader or null while redirecting

  return <>{children}</>;
}
