"use client";

import { Provider } from "react-redux";
import { ReactNode, useState } from "react";
import { makeStore, AppStore } from "@/store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  // Khởi tạo store 1 lần duy nhất, tránh lỗi React 19
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
