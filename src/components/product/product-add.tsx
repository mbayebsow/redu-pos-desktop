import SelectField from "../ui/select-field";
import TextField from "../ui/text-field";
import UplaodField from "../ui/uplaod-field";
import { useCategory } from "../../contexts/category-context";
import { ProductOptionType, ProductType } from "../../lib/types";
import Button from "../ui/button";
import { ChangeEvent } from "react";

interface ProductAddProps {
  productValue: ProductType;
  productOptions: ProductOptionType[];
  handleAddOption: () => void;
  handleOptionChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  handleProductValue: (product: ProductType) => void;
}

function ProductAdd({
  productValue,
  productOptions,
  handleProductValue,
  handleAddOption,
  handleOptionChange,
}: ProductAddProps) {
  const { categories } = useCategory();

  return (
    <div className="gap-5 flex flex-col w-[35vw] p-2">
      <div className="inline-flex gap-2 h-20">
        <div className="h-full aspect-square">
          <img className="rounded-lg h-full w-full  object-cover" src={productValue.image} alt="" />
        </div>
        <div className="h-full w-full ">
          <UplaodField
            label="Televerser une image"
            labelDescription="PNG ou JPG"
            name="image"
            onChange={(e) => handleProductValue({ ...productValue, image: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <div>
          <TextField
            roundedBorder="lg"
            label="Nom du produit"
            name="name"
            type="text"
            value={productValue.name}
            onChange={(e) => handleProductValue({ ...productValue, name: e.target.value })}
          />
          <SelectField
            roundedBorder="lg"
            label="Categorie"
            name="category"
            optionsData={categories}
            optionsText="name"
            optionsValue="id"
            defaultText="Pas de cetegorie"
            defaultTextValue="null"
            value={productValue.category}
            onChange={(e) =>
              handleProductValue({ ...productValue, category: Number(e.target.value) })
            }
          />
          <div className="flex items-center gap-0">
            <TextField
              roundedBorder="lg"
              label="Qté"
              name="stockQuantity"
              type="number"
              value={productValue.stockQuantity === 0 ? "" : productValue.stockQuantity}
              onChange={(e) =>
                handleProductValue({ ...productValue, stockQuantity: Number(e.target.value) })
              }
            />
            <SelectField
              roundedBorder="lg"
              label="Unité"
              name="unit"
              optionsData={["Piece", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]}
              value={productValue.unit}
              onChange={(e) => handleProductValue({ ...productValue, unit: e.target.value })}
            />
          </div>
          <div>
            <SelectField
              roundedBorder="lg"
              label="Fournisseur"
              name="supplier"
              optionsData={[""]}
              value=""
              onChange={(e) => handleProductValue({ ...productValue, supplier: e.target.value })}
            />
          </div>

          <div className="p-[2px] h-10">
            <div className="flex items-center justify-between rounded-lg bg-primary-100 h-full w-full pl-4 pr-2">
              <div className="text-xs text-gray-500 border-r border-black/20 pr-2">
                Type de produit:
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-primary-50 w-fit px-2 rounded-md">
                  <input
                    type="radio"
                    name="type"
                    value="standard"
                    id="standard"
                    onChange={() => handleProductValue({ ...productValue, type: "standard" })}
                    checked={productValue.type === "standard"}
                  />
                  <label htmlFor="standard">Standard</label>
                </div>

                <div className="flex items-center gap-2 bg-primary-50 w-fit px-2 rounded-md">
                  <input
                    type="radio"
                    name="type"
                    value="variable"
                    id="variable"
                    onChange={() => handleProductValue({ ...productValue, type: "variable" })}
                    checked={productValue.type === "variable"}
                  />
                  <label htmlFor="variable">Variable</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {productValue.type === "standard" && (
          <div className="">
            <TextField
              roundedBorder="lg"
              label="Prix d'achat"
              name="priceCost"
              type="number"
              value={productValue.priceCost === 0 ? "" : productValue.priceCost}
              onChange={(e) =>
                handleProductValue({ ...productValue, priceCost: Number(e.target.value) })
              }
            />
            <TextField
              roundedBorder="lg"
              label="Prix de vente"
              name="priceSale"
              type="number"
              value={productValue.priceSale === 0 ? "" : productValue.priceSale}
              onChange={(e) =>
                handleProductValue({ ...productValue, priceSale: Number(e.target.value) })
              }
            />
          </div>
        )}

        {productValue.type === "variable" && (
          <div className="bg-primary-50 p-2 rounded-lg border">
            <h3 className="pl-2 mb-2 font-bold">Options:</h3>
            {productOptions.map((option, index) => (
              <div key={index} className="border-t py-2">
                <div className="text-xs px-2 flex items-center justify-between">
                  <div>Option: {index + 1}</div>
                  <button className="text-red-500">x</button>
                </div>
                <div className="flex items-center gap-0">
                  <TextField
                    roundedBorder="lg"
                    label="Nom"
                    name="name"
                    type="text"
                    value={option.name}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                  <TextField
                    roundedBorder="lg"
                    label="Qté"
                    name="stockQuantity"
                    type="number"
                    value={option.stockQuantity === 0 ? "" : option.stockQuantity}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                </div>
                <TextField
                  roundedBorder="lg"
                  label="Prix d'achat"
                  name="priceCost"
                  type="number"
                  value={option.priceCost === 0 ? "" : option.priceCost}
                  onChange={(e) => handleOptionChange(index, e)}
                />
                <TextField
                  roundedBorder="lg"
                  label="Prix de vente"
                  name="priceSale"
                  type="number"
                  value={option.priceSale === 0 ? "" : option.priceSale}
                  onChange={(e) => handleOptionChange(index, e)}
                />
              </div>
            ))}
            <Button handleClick={handleAddOption}>Ajouter une option</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// const ProductAdd = ProductAddV2;
export default ProductAdd;
