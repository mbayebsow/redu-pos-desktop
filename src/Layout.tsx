import ApptNav from "./components/layout/app-nav";
import AppHeader from "./components/layout/app-header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="overflow-hidden flex h-full w-full">
      <Toaster />
      <ApptNav />
      <div className="flex flex-col h-full w-full">
        <AppHeader />
        <div className="pb-2 pr-2 flex h-full w-full overflow-hidden bg-primary-100 rounded-tl-xl p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
