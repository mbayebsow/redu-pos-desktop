import { Pen } from "lucide-react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ProductFields from "./product-fields";
import { memo, useCallback, useEffect, useState } from "react";
import useProductStore, { getproductByIdentifierAction } from "../../stores/product";
import { ProductOptionType, ProductType } from "../../utils/types";
import { INITIAL_PRODUCT, INITIAL_PRODUCT_OPTIONS } from "../shared/initials-state";

interface EditProductButtonProps {
  identifier: string;
}

const EditProductButton = memo<EditProductButtonProps>(({ identifier }) => {
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(INITIAL_PRODUCT);
  const [options, setOptions] = useState<ProductOptionType[]>([]);

  const editProduct = useProductStore(useCallback((state) => state.editProduct, []));
  const fetchProducts = useProductStore(useCallback((state) => state.fetchProducts, []));

  const resetValue = useCallback(() => {
    setOptions(Object.create(INITIAL_PRODUCT_OPTIONS));
    setProduct(Object.create(INITIAL_PRODUCT));
    fetchProducts();
    setOpentAddModal(false);
  }, []);

  useEffect(() => {
    const productDb = getproductByIdentifierAction(identifier);
    if (productDb) setProduct(productDb);
  }, [identifier]);

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={<ProductFields identifier={identifier} product={product} options={options} setProduct={setProduct} setOptions={setOptions} />}
        actionButtonShow
        actionButtonText="Enregistrer"
        actionButtonOnClick={() => editProduct(product, options, resetValue)}
      />
      <Button variant="icon" icon={<Pen />} handleClick={() => setOpentAddModal(true)} />
    </>
  );
});

export default EditProductButton;
