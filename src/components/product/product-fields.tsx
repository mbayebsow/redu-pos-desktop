import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { Plus, RotateCcw, Scan, X } from "lucide-react";
import ReactBarcode from "react-jsbarcode";

import { INITIAL_PRODUCT, INITIAL_PRODUCT_OPTIONS } from "../shared/initials-state";
import { ProductOptionType, ProductType } from "../../utils/types";
import { generateIdentifier } from "../../utils";

import useCategoryStore from "../../stores/category";
import useSupplierStore from "../../stores/supplier";
import { deleteProductAction, getproductByIdentifierAction, getproductOptionsByIdAction } from "../../stores/product";

import SelectField from "../ui/select-field";
import TextField from "../ui/text-field";
import UplaodField from "../ui/uplaod-field";
import Button from "../ui/button";
import Alert from "../ui/alert";
import toast from "react-hot-toast";

interface ProductProps {
  product: ProductType;
  setProduct: Dispatch<SetStateAction<ProductType>>;
}

interface OptionsProps {
  options: ProductOptionType[];
  setOptions: Dispatch<SetStateAction<ProductOptionType[]>>;
}

interface EditProductButtonProps extends ProductProps, OptionsProps {
  identifier?: string;
}

interface DeleteOptionButtonProps extends OptionsProps {
  index: number;
}

function DeleteOptionButton({ index, options, setOptions }: DeleteOptionButtonProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const removeOption = (index: number) => {
    const updatedOptions = [...options];

    const option = updatedOptions[index];

    if (option.identifier.length > 0) {
      const deleteEntry = deleteProductAction(option.identifier);
      if (deleteEntry.success) {
        toast.success("Option supprimé avec succès");
      } else {
        toast.error("Erreur lors de la suppression de l'option");
        return;
      }
    }

    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  return (
    <>
      <Alert
        variant="danger"
        showAlert={openConfirm}
        setShowAlert={setOpenConfirm}
        title="Suppression"
        message="Voulez-vous vraiment supprimer cette option?"
        onConfirm={() => {
          removeOption(index);
          setOpenConfirm(false);
        }}
      />
      <div>
        <Button variant="icon" icon={<X color="red" />} handleClick={() => setOpenConfirm(true)} />
      </div>
    </>
  );
}

function Head({ product, setProduct }: ProductProps) {
  // const product = useAddProductStore((state) => state.product);
  // const setProduct = useAddProductStore((state) => state.setProduct);

  const getUriImage = (files: FileList) => {
    var fReader = new FileReader();
    fReader.readAsDataURL(files[0]);
    fReader.onloadend = function () {
      const image = fReader.result;
      if (typeof image === "string") setProduct({ ...product, image });
    };
  };

  const generateRandomIdentifier = () => {
    const identifier = generateIdentifier();
    setProduct({ ...product, identifier });
  };

  useEffect(() => {
    if (!product.identifier) generateRandomIdentifier();
  }, [product.identifier]);

  return (
    <div className="flex items-center justify-between gap-2 h-28 sticky top-0 p-2 bg-white z-50 border-b">
      <div className="h-full w-auto aspect-square">
        <UplaodField label="Image" name="image" value={product.image} onChange={(e) => e.target.files && getUriImage(e.target.files)} />
      </div>
      <div className="h-full">
        {product.identifier && (
          <ReactBarcode className="h-full w-fit border rounded-lg bg-primary-50" value={product.identifier} options={{ background: "transparent" }} />
        )}
      </div>
      <div className="h-full flex flex-col justify-between items-center py-1">
        <div className="text-orange-100 bg-orange-600 rounded-md">
          <Button variant="icon" icon={<Scan />} />
        </div>
        <div className="bg-green-600 text-green-100 rounded-md">
          <Button variant="icon" icon={<RotateCcw />} handleClick={generateRandomIdentifier} />
        </div>
      </div>
    </div>
  );
}

function ProductValues({ product, setProduct }: ProductProps) {
  // const product = useAddProductStore((state) => state.product);
  const categories = useCategoryStore((state) => state.categories);
  const suppliers = useSupplierStore((state) => state.suppliers);
  // const setProduct = useAddProductStore((state) => state.setProduct);

  return (
    <div>
      <TextField
        roundedBorder="lg"
        label="Nom du produit"
        name="name"
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <SelectField
        roundedBorder="lg"
        label="Categorie"
        name="category"
        optionsData={categories}
        optionsText="name"
        optionsValue="id"
        defaultText="- - -"
        defaultTextValue="null"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: Number(e.target.value) })}
      />
      <div className="flex items-center gap-0">
        <TextField
          roundedBorder="lg"
          label="Qté"
          name="stockQuantity"
          type="number"
          value={product.stockQuantity === 0 ? "" : product.stockQuantity}
          onChange={(e) => setProduct({ ...product, stockQuantity: Number(e.target.value) })}
        />
        <SelectField
          roundedBorder="lg"
          label="Unité"
          name="unit"
          optionsData={["Piece", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]}
          value={product.unit}
          onChange={(e) => setProduct({ ...product, unit: e.target.value })}
        />
      </div>
      <div>
        <SelectField
          roundedBorder="lg"
          label="Fournisseur"
          name="supplier"
          optionsData={suppliers}
          optionsText="name"
          optionsValue="id"
          defaultText="- - -"
          defaultTextValue="null"
          value={product.supplier}
          onChange={(e) => setProduct({ ...product, supplier: Number(e.target.value) })}
        />
      </div>

      <div className="p-[2px] h-10">
        <div className="flex items-center justify-between rounded-lg bg-primary-100/50 h-full w-full pl-4 pr-2">
          <div className="text-xs text-gray-500 border-r border-black/20 pr-2">Type de produit:</div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary-50 w-fit px-2 rounded-md">
              <input
                type="radio"
                name="type"
                value="standard"
                id="standard"
                onChange={() => setProduct({ ...product, type: "standard" })}
                checked={product.type === "standard"}
              />
              <label htmlFor="standard">Standard</label>
            </div>

            <div className="flex items-center gap-1 bg-primary-50 w-fit px-2 rounded-md">
              <input
                type="radio"
                name="type"
                value="variable"
                id="variable"
                onChange={() => setProduct({ ...product, type: "variable" })}
                checked={product.type === "variable"}
              />
              <label htmlFor="variable">Variable</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductPrices({ product, setProduct }: ProductProps) {
  // const product = useAddProductStore((state) => state.product);
  // const setProduct = useAddProductStore((state) => state.setProduct);
  return (
    product.type === "standard" && (
      <div className="">
        <TextField
          roundedBorder="lg"
          label="Prix d'achat"
          name="priceCost"
          type="number"
          value={product.priceCost === 0 ? "" : product.priceCost}
          onChange={(e) => setProduct({ ...product, priceCost: Number(e.target.value) })}
        />
        <TextField
          roundedBorder="lg"
          label="Prix de vente"
          name="priceSale"
          type="number"
          value={product.priceSale === 0 ? "" : product.priceSale}
          onChange={(e) => setProduct({ ...product, priceSale: Number(e.target.value) })}
        />
      </div>
    )
  );
}

function ProductOptions({ product, options, setOptions }: OptionsProps & Partial<ProductProps>) {
  const changeOptionValue = (index, name, value) => {
    const newOptions = [...options];
    newOptions[index][name] = name === "name" ? value : Number(value);
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, Object.create(INITIAL_PRODUCT_OPTIONS)]);

  return (
    product?.type === "variable" && (
      <div className="bg-primary-50/50 p-2 rounded-lg border">
        <h3 className="pl-2 mb-2 font-bold">Options:</h3>
        {options.map((option, index) => (
          <div key={index} className="border-t py-2">
            <div className="text-xs px-2 mb-2 flex items-center justify-between">
              <div>Option: {index + 1}</div>
              <DeleteOptionButton index={index} options={options} setOptions={setOptions} />
            </div>
            <div className="flex items-center gap-0">
              <TextField
                roundedBorder="lg"
                label="Nom"
                name="name"
                type="text"
                value={option.name}
                onChange={(e) => changeOptionValue(index, "name", e.target.value)}
              />
              <TextField
                roundedBorder="lg"
                label="Qté"
                name="stockQuantity"
                type="number"
                value={option.stockQuantity === 0 ? "" : option.stockQuantity}
                onChange={(e) => changeOptionValue(index, "stockQuantity", e.target.value)}
              />
            </div>
            <TextField
              roundedBorder="lg"
              label="Prix d'achat"
              name="priceCost"
              type="number"
              value={option.priceCost === 0 ? "" : option.priceCost}
              onChange={(e) => changeOptionValue(index, "priceCost", e.target.value)}
            />
            <TextField
              roundedBorder="lg"
              label="Prix de vente"
              name="priceSale"
              type="number"
              value={option.priceSale === 0 ? "" : option.priceSale}
              onChange={(e) => changeOptionValue(index, "priceSale", e.target.value)}
            />
          </div>
        ))}
        <Button variant="tonal" icon={<Plus />} handleClick={addOption}>
          Ajouter une option
        </Button>
      </div>
    )
  );
}

function ProductFields({ identifier, product, options, setOptions, setProduct }: EditProductButtonProps) {
  useEffect(() => {
    if (identifier) {
      let product: ProductType = INITIAL_PRODUCT;
      let options: ProductOptionType[] = [];

      const productEntry = getproductByIdentifierAction(identifier);
      if (productEntry) {
        product = productEntry;
        options = getproductOptionsByIdAction(productEntry.id);
      }
      setOptions(options);
      setProduct(product);
    }

    return () => {
      if (product.identifier) {
        setOptions(Object.create(INITIAL_PRODUCT_OPTIONS));
        setProduct(Object.create(INITIAL_PRODUCT));
      }
    };
  }, [product.identifier]);

  return (
    <div className="gap-2 flex flex-col w-[35vw] h-full bg-white">
      <Head product={product} setProduct={setProduct} />

      <div className="flex flex-col gap-2 pt-0 p-2">
        <ProductValues product={product} setProduct={setProduct} />
        <ProductPrices product={product} setProduct={setProduct} />
        <ProductOptions product={product} options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}

export default memo(ProductFields);
