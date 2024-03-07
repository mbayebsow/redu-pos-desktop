import { useNavigate } from "react-router-dom";
import LoadSample from "../components/load-sample";
import Button from "../components/ui/button";
import { Home } from "lucide-react";
import Shortcuts from "../components/shortcuts";
import HeaderActionIcons from "./header-action-icons";
import Clock from "../components/clock";
import useTheme from "../stores/theme";

function DashHeader() {
  const navigate = useNavigate();
  const { headerStyle } = useTheme();

  return (
    <div style={headerStyle} id="AppHeader" className="relative h-18 p-3 flex justify-between gap-10 items-center">
      <div id="dragRegion" className="absolute left-0 top-0 w-full h-full" />

      <div className="flex relative gap-3 items-center text-sm z-10">
        <div className="border-r pr-4">
          <Clock />
        </div>
        <div>
          <Shortcuts />
        </div>
        <div>
          <Button roundedBorder="full" variant="icon" icon={<Home />} handleClick={() => navigate("/")} />
        </div>
      </div>

      <div className="flex items-center gap-3 z-10">
        <LoadSample />
        <HeaderActionIcons />
      </div>
    </div>
  );
}
export default DashHeader;
