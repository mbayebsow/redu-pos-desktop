import { memo } from "react";
import { playSwitchClicked } from "../../utils/interactive-sound";
import useTheme from "../../stores/theme";

interface ModalProps {
  showModal: boolean;
  content: JSX.Element;
  actionButtonText?: string;
  actionButtonShow?: boolean;
  actionButtonOnClick?: (params: any) => any;
  setShowModal: (p: boolean) => void;
}

function Modal({ showModal, content, actionButtonShow = false, actionButtonText, actionButtonOnClick, setShowModal }: ModalProps) {
  const { activeTheme } = useTheme();
  return showModal ? (
    <div className="h-full flex justify-center items-center overflow-hidden fixed inset-0 z-50">
      <div onClick={() => setShowModal(false)} className="w-full h-full bg-black/70 absolute top-0 bottom-0 left-0 right-0" />

      <div
        style={{
          backgroundColor: activeTheme[100],
        }}
        className="flex flex-col gap-3 max-h-full min-w-72 mx-auto overflow-hidden z-10 rounded-2xl p-2"
      >
        <div className="relative h-full w-full min-h-64 rounded-xl bg-white overflow-y-scroll">{content}</div>

        <div className="flex gap-2 items-center h-fit w-auto">
          <button
            style={{
              backgroundColor: activeTheme[300],
            }}
            className="py-3 w-full rounded-xl"
            type="button"
            onClick={() => {
              setShowModal(false);
              playSwitchClicked();
            }}
          >
            Fermer
          </button>
          {actionButtonShow && (
            <button
              style={{
                backgroundColor: activeTheme[800],
                color: activeTheme[50],
              }}
              className="py-3 w-full rounded-xl"
              type="button"
              onClick={(params) => {
                actionButtonOnClick && actionButtonOnClick(params);
                playSwitchClicked();
              }}
            >
              {actionButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(Modal);
