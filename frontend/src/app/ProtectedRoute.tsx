"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "teacher" | "student"; // role được phép truy cập
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.isConnected) {
      router.push("/login");
      return;
    }

    // Kiểm tra quyền
    if (role === "admin" && !user.isAdmin) router.push("/");
    if (role === "teacher" && !user.isTeacher) router.push("/");
    if (role === "student" && (user.isAdmin || user.isTeacher))
      router.push("/");
  }, [user, router, role]);

  return <>{user.isConnected ? children : null}</>;
};

export default ProtectedRoute;
