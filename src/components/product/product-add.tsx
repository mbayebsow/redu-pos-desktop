import SelectField from "../ui/select-field";
import SwitchField from "../ui/switch-field";
import TextField from "../ui/text-field";
import UplaodField from "../ui/uplaod-field";
import { useProduct } from "../../contexts/product-context";

function ProductAdd() {
  const { newProductState, handleNewProductValue } = useProduct();

  return (
    <div className="gap-3 flex flex-col bg-primary-50 border border-primary-light p-3 rounded-lg">
      <div className="inline-flex gap-2">
        <div className="h-40 aspect-square">
          <img className="rounded-lg h-full w-full  object-cover" src={newProductState.image} alt="" />
        </div>
        <UplaodField label="Televerser une image" labelDescription="PNG ou JPG" name="image" onChange={handleNewProductValue} />
      </div>
      <TextField label="Nom du produit" name="name" type="text" placeholder="Sucre" onChange={handleNewProductValue} />
      <div className="flex flex-row gap-2 mb-2">
        <TextField label="Prix du produit" name="price" type="number" placeholder="0" onChange={handleNewProductValue} />
        <SelectField
          label="Unité"
          placeholder="Choisir"
          name="unite"
          options={["Unité", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]}
          onChange={handleNewProductValue}
        />
      </div>
      <SwitchField label="Prix moitié" name="priceDemi" onChange={handleNewProductValue} />
    </div>
  );
}

export default ProductAdd;
