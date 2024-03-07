import { memo, useState } from "react";
import Button from "../ui/button";
import { Pen } from "lucide-react";
import Modal from "../ui/modal";

function SaleFields({ saleId }) {
  return (
    <div className="h-full">
      <div>{saleId}</div>
    </div>
  );
}

function SaleEditButton({ saleId }: { saleId: number }) {
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);
  return (
    <div>
      <Modal showModal={opentAddModal} setShowModal={setOpentAddModal} content={<SaleFields saleId={saleId} />} />
      <Button variant="icon" icon={<Pen />} handleClick={() => setOpentAddModal(true)} />
    </div>
  );
}

export default memo(SaleEditButton);
