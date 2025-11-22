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

    const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
    const initApp = async () => {
      const accessToken = await TokenUtils.getValidAccessToken();

      const firstVisitPaths = ["/"]; // những đường dẫn "lần đầu mở app"

      if (!accessToken) {
        if (!publicPaths.includes(currentPath)) {
          navigate("/login");
        }
        setIsLoading(false);
        return;
      }

      try {
        const res = await UserServices.getDetailUser(accessToken);
        if (res?.user) {
          dispatch(updateUser(res.user));

          // Chỉ redirect lần đầu khi mở app
          if (firstVisitPaths.includes(currentPath)) {
            if (res.user.isAdmin) {
              navigate("/admin");
            } else {
              navigate("/"); // user thường
            }
          }
        } else {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <LoadingComponent />;
  }
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
