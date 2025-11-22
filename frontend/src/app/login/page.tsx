"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as AuthServices from "../../services/shared/AuthServices";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { connectUser, disconnectUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
  isTeacher: boolean;
  needWallet: boolean;
  message: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res: LoginResponse = await AuthServices.login(email, password);

      // Sửa ở đây — login trả về accessToken, không phải token
      const { accessToken, isAdmin, isTeacher, needWallet } = res;

      localStorage.setItem("accessToken", accessToken);

      console.log(accessToken);

      // Nếu không cần ví → chuyển trang luôn
      if (!needWallet) {
        if (isAdmin) router.push("/admin/dashboard");
        else if (!isAdmin && !isTeacher) router.push("/student");
      }

      // Nếu cần ví (giảng viên)
      if (needWallet) {
        if (!window.ethereum) {
          alert("Bạn cần cài MetaMask!");
          return;
        }

        // mở MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const walletAddress = accounts[0];

        // 4. Gửi ví lên backend để xác minh
        const verifyRes = await AuthServices.verifyWallet(
          accessToken,
          walletAddress
        );

        await handleGetDetailUser(accessToken);

        console.log(verifyRes);

        // Fix verify result — không có verifyRes.data.ok
        if (
          verifyRes.message === "Wallet linked successfully" ||
          verifyRes.message === "Wallet verified"
        ) {
          router.push("/teacher/dashboard");
        } else {
          alert("Ví không khớp! Không thể đăng nhập.");
          localStorage.removeItem("accessToken");
        }
      }
    } catch (err: unknown) {
      alert(err.response?.data || "Lỗi đăng nhập!");
    }

    setLoading(false);
  };

  const handleGetDetailUser = async (accessToken: string) => {
    try {
      const res = await AuthServices.UserDetail(accessToken);
      const user = res;

      if (!user) throw new Error("Không tìm thấy thông tin người dùng!");

      dispatch(connectUser(res));
      return user;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      throw error;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          placeholder="vd: teacher@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Mật khẩu</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
