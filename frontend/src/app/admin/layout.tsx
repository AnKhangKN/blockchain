import SidebarComponent from "@/components/admin/SidebarComponent/SidebarComponent";
import HeaderComponent from "@/components/teacher/HeaderComponent/HeaderComponent";
import ReduxProvider from "@/providers/redux-provider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
          <div className="flex h-screen">
            {/* Sidebar */}
            <SidebarComponent />

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
              <HeaderComponent />
              {children}
            </main>
          </div>
       
      
  );
}
