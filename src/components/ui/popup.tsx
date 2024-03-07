import { X } from "lucide-react";
import useTheme from "../../stores/theme";

interface PopupProps {
  title: string;
  content: JSX.Element;
  showPopup: boolean;
  setShowPopup: (p: boolean) => void;
}

function Popup({ title, content, showPopup, setShowPopup }: PopupProps) {
  const { activeTheme } = useTheme();
  return (
    showPopup && (
      <div className="h-full inline-flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-2">
        <div onClick={() => setShowPopup(false)} className="w-full h-full bg-black/80 absolute top-0 bottom-0 left-0 right-0 z-0" />

        <div
          style={{ backgroundColor: activeTheme[100] }}
          className="h-fit w-fit min-w-60 flex flex-col gap-2 mx-auto z-10 rounded-2xl overflow-hidden p-2"
        >
          <div className="w-full flex items-center justify-between py-1">
            <div className="font-semibold">{title}</div>
            <div>
              <button onClick={() => setShowPopup(false)} className="bg-white rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="h-full w-full overflow-y-auto rounded-xl overflow-hidden bg-white p-2">{content}</div>
        </div>
      </div>
    )
  );
}

export default Popup;
