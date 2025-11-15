import SidebarComponent from "@/components/teacher/SidebarComponent/SidebarComponent";
import ReduxProvider from "@/providers/redux-provider";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <SidebarComponent />
          <div className="flex-1">
            <ReduxProvider>{children}</ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
