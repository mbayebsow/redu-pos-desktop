import SelectField from "../ui/select-field";
import SwitchField from "../ui/switch-field";
import TextField from "../ui/text-field";
import UplaodField from "../ui/uplaod-field";

function ProductAdd() {
  return (
    <div className="gap-3 flex flex-col bg-primary-50 border border-primary-light p-2 rounded-lg">
      <UplaodField />
      <TextField label="Nom du produit" name="name" type="text" placeholder="Sucre" />

      <div className="flex flex-row gap-2 mb-2">
        <TextField label="Prix du produit" name="price" type="number" placeholder="0" />
        <TextField label="Quantité" name="qty" type="number" placeholder="0" />
      </div>

      <div className="flex flex-row gap-2 mb-2">
        <SelectField
          label="Unité"
          placeholder="Choisir"
          name="unite"
          options={["Unité", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]}
        />
      </div>

      <SwitchField />
    </div>
  );
}

export default ProductAdd;
