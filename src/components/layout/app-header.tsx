import Calculator from "../calculator/calculator";
import LoadSample from "../load-sample";
import Button from "../ui/button";
import { Fullscreen, User } from "lucide-react";

function AppHeader() {
  return (
    <div className="relative h-18 p-3">
      <div className="h-full flex justify-between relative gap-10 items-center">
        <div className="flex gap-3 items-center text-sm">
          <div className="flex items-center gap-1">
            <div>19 Janvier 2024</div>
            <div>-</div>
            <div>14:30</div>
          </div>
          <div>|</div>
          <div className="flex items-center gap-1">
            <div>20</div>
            <div>-</div>
            <div>Ventes</div>
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
