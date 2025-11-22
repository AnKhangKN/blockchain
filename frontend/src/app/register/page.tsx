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
      // Gọi API register
      const res = await AuthServices.register(email, password);

      // Nếu server trả token sau register, bạn có thể lưu
      if (res?.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        alert("Đăng ký thành công! Bạn sẽ được chuyển đến login.");
      } else {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
      }

      router.push("/login"); // chuyển đến login page
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
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Đăng ký</h1>

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
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
