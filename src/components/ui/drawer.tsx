import { X } from "lucide-react";
import Button from "./button";
import useTheme from "../../stores/theme";

interface DrawerProps {
  showDrawer: boolean;
  content: JSX.Element;
  setShowDrawer: (p: boolean) => void;
}

function Drawer({ showDrawer, content, setShowDrawer }: DrawerProps) {
  const { activeTheme } = useTheme();
  return (
    showDrawer && (
      <div className="h-full inline-flex justify-end items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div onClick={() => setShowDrawer(false)} className="w-full h-full bg-black/70 absolute top-0 bottom-0 left-0 right-0 z-0" />
        <div className="z-10 p-3">
          <div style={{ backgroundColor: activeTheme[100] }} className="w-fit h-fit rounded-full">
            <Button variant="icon" icon={<X />} handleClick={() => setShowDrawer(false)} />
          </div>
        </div>

        <div className="relative h-full w-fit overflow-hidden rounded-bl-2xl rounded-tl-2xl z-10 bg-white">{content}</div>
      </div>
    )
  );
}

export default Drawer;
