"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { connectUser, disconnectUser } from "@/store/slices/userSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { name, walletAddress, isConnected } = useAppSelector(
    (state) => state.user
  );

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Blockchain Grade System</h1>
      {isConnected ? (
        <>
          <p>👋 Xin chào {name}</p>
          <p>💼 Ví: {walletAddress}</p>
          <button
            onClick={() => dispatch(disconnectUser())}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Ngắt kết nối
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            dispatch(connectUser({ name: "Khang", walletAddress: "0xABC..." }))
          }
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Kết nối ví
        </button>
      )}
    </div>
  );
}
