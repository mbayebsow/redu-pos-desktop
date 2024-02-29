import { useNavigate } from "react-router-dom";
import Calculator from "../components/calculator/calculator";
import LoadSample from "../components/load-sample";
import Button from "../components/ui/button";
import { Fullscreen, Home, User } from "lucide-react";
import Shortcuts from "../components/shortcuts";

function AppHeader() {
  const navigate = useNavigate();
  return (
    <div className="relative h-18 p-3">
      <div className="h-full flex justify-between relative gap-10 items-center">
        <div className="flex gap-3 items-center text-sm">
          <div className="border-r pr-4">
            <div className="font-semibold text-md">14h : 30</div>
            <div className="text-xs">19 Janvier 2024</div>
          </div>
          <div>
            <Button roundedBorder="full" variant="icon" icon={<Home />} handleClick={() => navigate("/")} />
          </div>
          <div>
            <Shortcuts />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LoadSample />
          <Calculator />
          <Button roundedBorder="full" variant="icon" icon={<User />} />
          <Button roundedBorder="full" variant="icon" icon={<Fullscreen />} />
        </div>
      </div>
    </div>
  );
}
export default AppHeader;
