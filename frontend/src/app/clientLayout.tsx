"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import * as TokenUtils from "@/utils/token.utils";
import * as AuthServices from "@/services/shared/AuthServices";
import { connectUser, disconnectUser } from "@/store/slices/userSlice";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const accessToken = await TokenUtils.getValidAccessToken();

      if (!accessToken) {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      try {
        const res = await AuthServices.UserDetail(accessToken);

        if (res) {
          dispatch(connectUser(res));

          // redirect lần đầu
          if (pathname === "/") {
            if (res.isAdmin) {
              router.push("/admin");
            } else if (res.isTeacher) {
              router.push("/teacher/dashboard");
            } else {
              router.push("/students");
            }
          }
        } else {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      } catch (err) {
        console.error("Lỗi khi fetch user:", err);
        localStorage.removeItem("accessToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, [dispatch, router, pathname]);

  if (isLoading) return <LoadingComponent />;

  return <>{children}</>;
}
