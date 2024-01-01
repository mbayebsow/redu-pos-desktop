import RootNav from "./components/layout/Nav";
import RootHeader from "./components/layout/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="overflow-hidden flex h-full w-full">
      <RootNav />
      <div className="flex flex-col h-full w-full">
        <RootHeader />
        <div className="flex-row p-3 flex gap-2 h-full w-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
