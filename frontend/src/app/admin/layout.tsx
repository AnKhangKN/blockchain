import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
import ProtectedRoute from "../ProtectedRoute";
import HeaderComponent from "@/components/teacher/HeaderComponent/HeaderComponent";

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

        <div className="flex-1">
          <HeaderComponent />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
