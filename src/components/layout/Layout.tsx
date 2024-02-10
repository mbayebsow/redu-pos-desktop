import ApptNav from "./app-nav";
import AppHeader from "./app-header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="overflow-hidden flex h-screen w-screen">
      <Toaster />
      <ApptNav />
      <div className="flex flex-col h-full w-full">
        <AppHeader />
        <div className="p-3 pt-0 pl-0 h-full w-full overflow-hidden ">
          <div className="h-full w-full overflow-hidden rounded-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
