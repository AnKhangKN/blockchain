import HeaderComponent from "@/components/student/HeaderComponent/HeaderComponent";
import ProtectedRoute from "../ProtectedRoute";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute role="student">
      <div className="flex">
        <div className="flex-1">
          <HeaderComponent />
          <div className="mt-20 bg-amber-50">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
