interface ModalProps {
  showModal: boolean;
  content: JSX.Element;
  actionButtonText?: string;
  actionButtonShow?: boolean;
  actionButtonOnClick?: (params: any) => void;
  setShowModal: (p: boolean) => void;
}

function Modal({
  showModal,
  content,
  actionButtonShow = false,
  actionButtonText,
  actionButtonOnClick,
  setShowModal,
}: ModalProps) {
  return (
    <>
      {showModal ? (
        <>
          <div className="h-full inline-flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-3">
            <div
              onClick={() => setShowModal(false)}
              className="w-full h-full bg-black/80 absolute top-0 bottom-0 left-0 right-0 z-0"
            />

            <div className="flex flex-col gap-2 justify-between max-h-full h-fit w-fit mx-auto z-10 bg-primary-50 rounded-2xl overflow-hidden  p-2">
              <div className="h-full w-auto min-h-80 min-w-72 overflow-y-auto rounded-xl overflow-hidden shadow border bg-white/60">
                {content}
              </div>

              <div className="flex gap-2 items-center h-fit w-auto font-bold">
                <button
                  className="bg-primary-300 text-primary-900 uppercase py-3 w-full rounded-xl"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
                {actionButtonShow && (
                  <button
                    className="bg-primary-800 text-primary-50 uppercase py-3 w-full rounded-xl"
                    type="button"
                    onClick={actionButtonOnClick}
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

export default Modal;
