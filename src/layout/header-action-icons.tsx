import { Fullscreen, User } from "lucide-react";
import Calculator from "../components/calculator";
import Button from "../components/ui/button";

function HeaderActionIcons() {
  return (
    <div className="flex items-center gap-3">
      <Calculator />
      <Button roundedBorder="full" variant="icon" icon={<User />} />
      <Button roundedBorder="full" variant="icon" icon={<Fullscreen />} />
    </div>
  );
}

export default HeaderActionIcons;
