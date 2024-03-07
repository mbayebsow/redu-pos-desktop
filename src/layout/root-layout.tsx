import { Outlet } from "react-router-dom";
import useTheme from "../stores/theme";
import { Toaster } from "react-hot-toast";

function RootLayout() {
  const { appBackground, activeTheme } = useTheme();
  return (
    <>
      <Toaster />
      <div style={{ backgroundColor: appBackground, color: activeTheme[800] }} className={`overflow-hidden h-screen w-screen`}>
        <div className="w-full h-full flex bg-gray-600/5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
