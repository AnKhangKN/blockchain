"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as AuthServices from "../../services/shared/AuthServices";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthServices.register(email, password);

      if (res?.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        alert("Đăng ký thành công! Bạn sẽ được chuyển đến đăng nhập.");
      } else {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
      }

      router.push("/login"); // chuyển đến trang login
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Lỗi đăng ký");
      }
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng ký
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
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
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        {/* Link dẫn tới login */}
        <p className="text-center mt-4 text-gray-600">
          Đã có tài khoản?{" "}
          <button
            className="text-green-600 font-medium hover:underline"
            onClick={() => router.push("/login")}
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
