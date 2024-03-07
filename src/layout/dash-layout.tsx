import { Outlet } from "react-router-dom";
import DashHeader from "./dash-header";
import DashSideBare from "./dash-side-bare";
import useTheme from "../stores/theme";

function DashLayout() {
  const { activeTheme } = useTheme();
  return (
    <div className={`h-full w-full`}>
      <div className="flex flex-col w-full h-full bg-gray-600/5 relative">
        <DashHeader />
        <div className="p-3 pl-0 pt-0 h-full w-full overflow-hidden flex">
          <DashSideBare />
          <div style={{ backgroundColor: activeTheme[50] }} className="h-full w-full rounded-lg overflow-hidden">
            <div className="bg-white/60 p-2 w-full h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashLayout;
