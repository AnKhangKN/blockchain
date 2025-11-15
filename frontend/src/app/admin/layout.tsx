import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
import ReduxProvider from "@/providers/redux-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarComponent />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
