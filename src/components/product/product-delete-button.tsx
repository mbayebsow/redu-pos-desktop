import { Trash } from "lucide-react";
import Button from "../ui/button";
import { memo, useCallback, useState } from "react";
import useProductStore from "../../stores/product";
import Alert from "../ui/alert";

interface DeleteProductButtonProps {
  identifier: string;
}

const DeleteProductButton = memo<DeleteProductButtonProps>(({ identifier }) => {
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);

  const deleteProduct = useProductStore(useCallback((state) => state.deleteProduct, []));

  const confirmDelete = useCallback(() => {
    identifier && deleteProduct(identifier);
    setOpentAddModal(false);
  }, []);

  return (
    <>
      <Alert
        variant="danger"
        showAlert={opentAddModal}
        setShowAlert={setOpentAddModal}
        title="Suppression"
        message="Voulez-vous vraiment supprimer ce produit?"
        onConfirm={confirmDelete}
      />
      <Button variant="icon" icon={<Trash color="red" />} handleClick={() => setOpentAddModal(true)} />
    </>
  );
});

export default DeleteProductButton;
