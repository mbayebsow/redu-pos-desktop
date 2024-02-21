import { X } from "lucide-react";
import Button from "./button";

interface DrawerProps {
  showDrawer: boolean;
  content: JSX.Element;
  setShowDrawer: (p: boolean) => void;
}

function Drawer({ showDrawer, content, setShowDrawer }: DrawerProps) {
  return (
    <>
      {showDrawer ? (
        <>
          <div className="h-full inline-flex justify-end items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              onClick={() => setShowDrawer(false)}
              className="w-full h-full bg-black/70 absolute top-0 bottom-0 left-0 right-0 z-0"
            />
            <div className="z-10 p-3">
              <div className="w-fit h-fit rounded-full bg-primary-100">
                <Button variant="icon" icon={<X />} handleClick={() => setShowDrawer(false)} />
              </div>
            </div>

            <div className="relative h-full w-fit bg-primary-50 overflow-hidden rounded-bl-2xl rounded-tl-2xl z-10">
              {content}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Drawer;
