import { memo } from "react";
import { playSwitchClicked } from "../../utils/interactive-sound";

interface ModalProps {
  showModal: boolean;
  content: JSX.Element;
  actionButtonText?: string;
  actionButtonShow?: boolean;
  actionButtonOnClick?: (params: any) => any;
  setShowModal: (p: boolean) => void;
}

function Modal({ showModal, content, actionButtonShow = false, actionButtonText, actionButtonOnClick, setShowModal }: ModalProps) {
  return (
    <>
      {showModal ? (
        <>
          <div className="h-full inline-flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-2">
            <div onClick={() => setShowModal(false)} className="w-full h-full bg-black/70 absolute top-0 bottom-0 left-0 right-0 z-0" />

            <div className="flex flex-col gap-3 justify-between h-fit w-fit max-h-full min-h-80 min-w-72 mx-auto  overflow-hidden z-10 bg-primary-100 rounded-2xl p-2">
              <div className="relative h-full w-full rounded-xl bg-white/80 overflow-y-scroll">{content}</div>

              <div className="flex gap-2 items-center h-fit w-auto">
                <button
                  className="bg-primary-300 text-primary-900 py-3 w-full rounded-xl"
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
                    className="bg-primary-800 text-primary-50 py-3 w-full rounded-xl"
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
        </>
      ) : null}
    </>
  );
}

export default memo(Modal);
