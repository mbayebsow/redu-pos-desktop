import { Plus } from "lucide-react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ProductFields from "./product-fields";
import { memo, useCallback, useState } from "react";
import useProductStore from "../../stores/product";
import { INITIAL_PRODUCT, INITIAL_PRODUCT_OPTIONS } from "../../utils/constants/initials-state";
import { ProductOptionType, ProductType } from "../../utils/types";

const AddProductButton = memo(() => {
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(INITIAL_PRODUCT);
  const [options, setOptions] = useState<ProductOptionType[]>([INITIAL_PRODUCT_OPTIONS]);

  const addProduct = useProductStore(useCallback((state) => state.addProduct, []));
  const fetchProducts = useProductStore(useCallback((state) => state.fetchProducts, []));

  const resetValue = useCallback(() => {
    setOptions(Object.create(INITIAL_PRODUCT_OPTIONS));
    setProduct(Object.create(INITIAL_PRODUCT));
    fetchProducts();
  }, []);

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={<ProductFields product={product} options={options} setProduct={setProduct} setOptions={setOptions} />}
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={() => addProduct(product, options, resetValue)}
      />
      <Button roundedBorder="full" text="Ajouter" icon={<Plus />} handleClick={() => setOpentAddModal(true)} />
    </>
  );
});

export default AddProductButton;
