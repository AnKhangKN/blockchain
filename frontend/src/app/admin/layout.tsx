import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
import ReduxProvider from "@/providers/redux-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <ReduxProvider>
          <div className="flex h-screen">
            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
