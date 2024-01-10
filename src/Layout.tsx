import ApptNav from "./components/layout/app-nav";
import AppHeader from "./components/layout/app-header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="overflow-hidden flex h-full w-full">
      <ApptNav />
      <div className="flex flex-col h-full w-full">
        <AppHeader />
        <div className="p-2 flex h-full w-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
