import HeaderComponent from "@/components/teacher/HeaderComponent/HeaderComponent";
import SidebarComponent from "@/components/teacher/SidebarComponent/SidebarComponent";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex-1">
        <HeaderComponent />
        {children}
      </div>
    </div>
  );
}
