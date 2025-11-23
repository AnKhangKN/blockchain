"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as AuthServices from "../../services/shared/AuthServices";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { connectUser } from "@/store/slices/userSlice";
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
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== LOGIN =====
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res: LoginResponse = await AuthServices.login(email, password);
      const { accessToken, isAdmin, isTeacher, needWallet } = res;

      localStorage.setItem("accessToken", accessToken);

      if (!needWallet) {
        if (isAdmin) router.push("/admin/dashboard");
        else if (!isAdmin && !isTeacher) router.push("/student/dashboard");
      }

      if (needWallet) {
        if (!window.ethereum) {
          alert("Bạn cần cài MetaMask!");
          setLoading(false);
          return;
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];

        const verifyRes = await AuthServices.verifyWallet(
          accessToken,
          walletAddress
        );

        await handleGetDetailUser(accessToken);

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
    } catch (err) {
      alert(err || "Lỗi đăng nhập!");
    }

    setLoading(false);
  };

  // ===== REGISTER =====
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      await AuthServices.register(email, password);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsRegister(false);
    } catch (err) {
      alert(err || "Lỗi đăng ký!");
    }
    setLoading(false);
  };

  const handleGetDetailUser = async (accessToken: string) => {
    try {
      const user = await AuthServices.UserDetail(accessToken);
      if (!user) throw new Error("Không tìm thấy thông tin người dùng!");
      dispatch(connectUser(user));
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h1>

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="vd: teacher@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
          >
            {loading ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        {/* Link chuyển form */}
        <p className="text-center mt-4 text-gray-600">
          {isRegister ? (
            <>
              Đã có tài khoản?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setIsRegister(false)}
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <>
              Chưa có tài khoản?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => router.push("/register")}
              >
                Đăng ký
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
