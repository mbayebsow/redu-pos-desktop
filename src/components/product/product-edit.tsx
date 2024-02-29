import { useEffect, useState } from "react";
import { ProductType } from "../../utils/types";

import TextField from "../../components/ui/text-field";
import SwitchField from "../../components/ui/switch-field";
import Button from "../../components/ui/button";
import { playBeep } from "../../utils/interactive-sound";

function ProductEdit({ product }: { product: ProductType }) {
  const [productSelected, setProductSelected] = useState<ProductType>(product);

  const getInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    let VALUE: string | boolean;
    VALUE = value ? value : checked;
    // if (productSelected) setProductSelected({ ...productSelected, [name]: VALUE });
    setProductSelected({ ...productSelected, [name]: VALUE });
  };

  const saveEdit = () => {
    alert(JSON.stringify(productSelected));
  };

  useEffect(() => {
    playBeep();
    if (product) setProductSelected(product);
  }, [product]);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="w-full flex flex-col gap-4">
        <div className="aspect-square w-auto h-28 bg-primary-100 rounded-lg">
          <img src={productSelected?.image} className="w-auto h-full rounded-md" />
        </div>

        <div className="gap-3 flex-col flex h-fit">
          <TextField variant="tonal" type="text" label="Nom:" name="name" value={productSelected?.name} onChange={getInputData} />
          <div className="inline-flex gap-2 items-center">
            <TextField variant="tonal" type="number" label="Prix:" name="price" value={productSelected?.priceSale} onChange={getInputData} />
            <TextField variant="tonal" type="text" label="Unité:" name="unite" value={productSelected?.stockQuantity} onChange={getInputData} />
          </div>
          <SwitchField style={2} label="Afficher le produit" name="isActive" onChange={getInputData} checked={productSelected?.isActive} />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button text="Enregister" handleClick={saveEdit} />
        <Button text="Supprimer" variant="tonal" handleClick={() => null} />
      </div>
    </div>
  );
}

export default ProductEdit;
