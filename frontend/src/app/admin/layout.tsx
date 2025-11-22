import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
<<<<<<< HEAD
import HeaderComponent from "@/components/teacher/HeaderComponent/HeaderComponent";
import ReduxProvider from "@/providers/redux-provider";
=======
import ProtectedRoute from "../ProtectedRoute";
>>>>>>> 52fb528be07cd246ee13cabdca0849f1a0ed874a

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    
          <div className="flex h-screen">
            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
              <HeaderComponent />
              {children}
            </main>
          </div>
       
      
=======
    <ProtectedRoute role="admin">
      <div className="flex h-screen">
        {/* Sidebar */}
        <SidebarComponent />
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </ProtectedRoute>
>>>>>>> 52fb528be07cd246ee13cabdca0849f1a0ed874a
  );
}
