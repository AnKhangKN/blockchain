import ReduxProvider from "@/providers/redux-provider";
import "@/styles/globals.css";
import * as TokenUtils from "@/utils/token.utils"
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
