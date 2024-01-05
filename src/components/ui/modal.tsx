interface ModalProps {
  showModal: boolean;
  setShowModal: (p: boolean) => void;
  content: JSX.Element;
}

function Modal({ showModal, setShowModal, content }: ModalProps) {
  return (
    <>
      {showModal ? (
        <>
          <div className="h-full bg-black/70 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 p-3">
            <div className="flex flex-col justify-between h-full w-fit mx-auto bg-gray-100 rounded-md overflow-hidden">
              <div className="h-full w-auto overflow-y-auto p-2">{content}</div>
              <div className="flex items-center border-t h-fit w-auto">
                <button className="bg-red-500 text-white font-bold uppercase py-3 w-full" type="button" onClick={() => setShowModal(false)}>
                  Fermer
                </button>
                <button className="bg-green-500 text-white font-bold uppercase py-3 w-full" type="button" onClick={() => setShowModal(false)}>
                  Valider
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
