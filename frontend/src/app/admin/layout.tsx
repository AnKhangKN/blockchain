import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
import ProtectedRoute from "../ProtectedRoute";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute role="admin">
      <div className="flex h-screen">
        {/* Sidebar */}
        <SidebarComponent />
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
