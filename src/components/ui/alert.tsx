import { memo } from "react";
import { playSwitchClicked } from "../../utils/interactive-sound";
import { MessageSquare, MessageSquareWarning, MessageSquareX } from "lucide-react";

interface AlertProps {
  showAlert: boolean;
  title: string;
  message: string;
  variant?: "info" | "warning" | "danger";
  onConfirm?: () => void;
  onCancel?: () => void;
  setShowAlert: (p: boolean) => void;
}

function Alert({ showAlert, title, variant = "info", message, onConfirm, onCancel, setShowAlert }: AlertProps) {
  return (
    <>
      {showAlert ? (
        <>
          <div className="h-full inline-flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-2">
            <div onClick={() => setShowAlert(false)} className="w-full h-full bg-black/70 absolute top-0 bottom-0 left-0 right-0 z-0" />

            <div
              className={`${variant === "danger" ? "bg-red-100" : variant === "warning" ? "bg-orange-100" : variant === "info" && "bg-primary-100"} flex flex-col gap-3 justify-between h-fit w-fit mx-auto overflow-hidden z-10 rounded-2xl p-2`}
            >
              <div
                className={` ${variant === "danger" ? "text-red-900" : variant === "warning" ? "text-orange-900" : variant === "info" && "text-primary-900"} relative h-fit w-fit rounded-xl bg-white/80 text-center flex flex-col gap-2 p-5`}
              >
                <div
                  className={`${variant === "danger" ? "bg-red-100" : variant === "warning" ? "bg-orange-100" : variant === "info" && "bg-primary-100"} w-fit mx-auto p-5 rounded-full`}
                >
                  {variant === "info" && <MessageSquare size={50} />}
                  {variant === "warning" && <MessageSquareWarning size={50} />}
                  {variant === "danger" && <MessageSquareX size={50} />}
                </div>
                <div>
                  <div className="text-3xl font-bold">{title}</div>
                  <div className="mt-2 w-52 tetx-sm opacity-70">{message}</div>
                </div>
              </div>

              <div className="flex gap-2 items-center h-fit w-auto">
                <button
                  className={`${variant === "danger" ? "text-red-900" : variant === "warning" ? "text-orange-900" : variant === "info" && "text-primary-900"} bg-white/80 py-3 w-full rounded-xl`}
                  type="button"
                  onClick={() => {
                    setShowAlert(false);
                    playSwitchClicked();
                    onCancel && onCancel();
                  }}
                >
                  Fermer
                </button>

                <button
                  className={`${variant === "danger" ? "bg-red-800 text-red-50" : variant === "warning" ? "bg-orange-800 text-orange-50" : variant === "info" && "bg-primary-800 text-primary-50"} py-3 w-full rounded-xl`}
                  type="button"
                  onClick={() => {
                    onConfirm && onConfirm();
                    playSwitchClicked();
                  }}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default memo(Alert);
