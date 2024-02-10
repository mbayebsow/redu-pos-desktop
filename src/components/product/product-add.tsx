import SelectField from "../ui/select-field";
import TextField from "../ui/text-field";
import UplaodField from "../ui/uplaod-field";
import { useProduct } from "../../contexts/product-context";
import { useCategory } from "../../contexts/category-context";

function ProductAdd() {
  const { newProductState, handleNewProductValue } = useProduct();
  const { categories } = useCategory();

  return (
    <div className="gap-5 flex flex-col w-[30vw] p-3">
      <div className="inline-flex gap-2">
        <div className="h-40 aspect-square">
          <img
            className="rounded-lg h-full w-full  object-cover"
            src={newProductState.image}
            alt=""
          />
        </div>
        <div className="h-40 w-full ">
          <UplaodField
            label="Televerser une image"
            labelDescription="PNG ou JPG"
            name="image"
            onChange={(e) => handleNewProductValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-2">
        <TextField
          label="Nom du produit"
          name="name"
          type="text"
          value={newProductState.name}
          onChange={(e) => handleNewProductValue(e.target.value)}
        />
        <TextField
          label="Prix du produit"
          name="price"
          type="number"
          value={newProductState.price === 0 ? "" : newProductState.price}
          onChange={(e) => handleNewProductValue(e.target.value)}
        />
        <SelectField
          label="Categorie"
          name="category"
          optionsData={categories}
          optionsText="name"
          optionsValue="id"
          defaultText="Pas de cetegorie"
          defaultTextValue="null"
          value={newProductState.category}
          onChange={(e) => handleNewProductValue(e.target.value)}
        />
        {/*8<SelectField
          label="Fournisseur"
          placeholder="Choisir"
          name="supplier"
          value={newProductState.supplier}
          options={["Unité", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]}
          onChange={handleNewProductValue}
        />*/}
      </div>
    </div>
  );
}

export default ProductAdd;
