import { ChangeEvent, useState } from "react";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { CategoryProvider, useCategory } from "../contexts/category-context";

import TextField from "../components/ui/text-field";
import ProductAdd from "../components/product/product-add";
import ProductsList from "../components/product/products-list";
import Button from "../components/ui/button";
import Modal from "../components/ui/modal";
import CategoryAdd from "../components/category/category-add";
import { CategoryType, ProductOptionType, ProductType } from "../lib/types";
import SectionTitle from "../components/ui/section-title";
import toast from "react-hot-toast";

const INITIAL_CATEGORY = {
  id: 0,
  name: "",
  color: "#1e8275",
  isActive: true,
};

const INITIAL_PRODUCT: ProductType = {
  id: 0,
  unit: "Piece",
  name: "",
  supplier: "",
  type: "standard",
  priceCost: 0,
  priceSale: 0,
  identifier: 0,
  stockQuantity: 0,
  category: 0,
  isActive: true,
  image: "http://dummyimage.com/100x100.png",
};

const INITIAL_PRODUCT_OPTIONS: ProductOptionType[] = [
  {
    id: 0,
    ProductID: 0,
    name: "",
    priceCost: 0,
    priceSale: 0,
    stockQuantity: 0,
  },
];

const genererUIDProduit = (): number => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const randomDigits = Math.floor(Math.random() * 90000) + 10000;
  const uid = Number(randomDigits + year + month + day + hours + minutes + seconds);

  return uid;
};

function CategorySection() {
  const { categories, addCategory } = useCategory();
  const [opentAddModal, setOpentAddModal] = useState(false);
  const [categorySearchName, setCategorySearchName] = useState("");
  const [categorySate, setCategoryState] = useState<CategoryType>(INITIAL_CATEGORY);

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={<CategoryAdd categorySate={categorySate} setCategoryState={setCategoryState} />}
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={() => {
          addCategory(categorySate);
          setCategoryState(INITIAL_CATEGORY);
        }}
      />
      <div className="w-full h-full flex flex-col justify-between">
        <SectionTitle>Catégories</SectionTitle>
        <div className="pb-2 mb-2 border-b">
          <TextField
            label="Recherche"
            name="filter"
            type="text"
            value={categorySearchName}
            clrearValue={() => setCategorySearchName("")}
            onChange={(e) => setCategorySearchName(e.target.value)}
          />
        </div>
        <div className="h-full w-full overflow-y-scroll flex flex-col gap-2 pr-2">
          {categories
            .filter((category) =>
              category.name.toLocaleLowerCase().includes(categorySearchName.toLocaleLowerCase())
            )
            .map((category, i) => (
              <div key={i} className=" bg-primary-100/50 p-2 rounded-lg flex gap-2">
                <div
                  style={{ backgroundColor: category.color }}
                  className="h-7 w-7 bg-primary-50 rounded-full overflow-hidden"
                />
                <div>{category.name}</div>
              </div>
            ))}
        </div>
        <div className="w-full h-fit mt-2 pt-2 border-t">
          <Button handleClick={() => setOpentAddModal(true)} text="Ajouter" />
        </div>
      </div>
    </>
  );
}

function ProductSection() {
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<ProductType>(INITIAL_PRODUCT);
  const [productOptions, setProductOptions] =
    useState<ProductOptionType[]>(INITIAL_PRODUCT_OPTIONS);
  const [searchByName, setSearchByName] = useState("");
  const { addProduct } = useProduct();

  const handleNewProduct = (event: ProductType) => {
    console.log(event);
    setNewProduct(event);

    // const { name, value, files, checked } = event.target;

    // let VALUE;

    // if (value) VALUE = value;
    // if (!value && !files) VALUE = checked;
    // if (files) {
    //   var fReader = new FileReader();
    //   fReader.readAsDataURL(files[0]);
    //   fReader.onloadend = function () {
    //     VALUE = fReader.result;
    //     setNewProduct({
    //       ...newProduct,
    //       [name]: name === "price" || name === "stockQuantity" ? Number(VALUE) : VALUE,
    //     });
    //     return;
    //   };
    // }
    // setNewProduct({
    //   ...newProduct,
    //   [name]: name === "price" || name === "stockQuantity" ? Number(VALUE) : VALUE,
    // });
  };

  const handleOptionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedOptions = [...productOptions];
    updatedOptions[index][name] = name === "name" ? value : Number(value);
    console.log(updatedOptions);

    setProductOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setProductOptions([
      ...productOptions,
      {
        id: 0,
        ProductID: 0,
        name: "",
        priceCost: 0,
        priceSale: 0,
        stockQuantity: 0,
      },
    ]);
  };

  const addNewProduct = () => {
    console.log(newProduct, productOptions);
    return;

    if (newProduct.name === "") {
      toast.error("Le nom du produit est obligatoir");
      return;
    }

    if (newProduct.type === "standard" && newProduct.priceSale === 0) {
      toast.error("Le prix est obligatoir");
      return;
    }
    const identifier = genererUIDProduit();

    addProduct({ ...newProduct, identifier });
    toast.success("Produit enregistrer.");
    setNewProduct(INITIAL_PRODUCT);
  };

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={
          <ProductAdd
            productValue={newProduct}
            productOptions={productOptions}
            handleProductValue={handleNewProduct}
            handleAddOption={handleAddOption}
            handleOptionChange={handleOptionChange}
          />
        }
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={addNewProduct}
      />
      <div className="w-full flex flex-col h-full">
        <SectionTitle>Produits</SectionTitle>
        <div className="flex justify-between gap-2 w-full">
          <TextField
            type="text"
            label="Recherche"
            name="search"
            value={searchByName}
            clrearValue={() => setSearchByName("")}
            onChange={(e) => setSearchByName(e.target.value)}
          />

          <div className="flex items-end gap-1">
            <Button
              roundedBorder="full"
              variant="tonal"
              text="Prix: Tout"
              handleClick={() => setOpentAddModal(true)}
            />
            <Button
              roundedBorder="full"
              variant="tonal"
              text="Visibilité: Tout"
              handleClick={() => setOpentAddModal(true)}
            />
            <Button
              roundedBorder="full"
              text="Ajouter"
              handleClick={() => setOpentAddModal(true)}
            />
          </div>
        </div>

        <div className="w-full h-full grid overflow-scroll">
          <ProductsList filterByName={searchByName} />
        </div>
      </div>
    </>
  );
}

function ProductsScreen() {
  return (
    <CategoryProvider>
      <div className="w-full h-full overflow-hidden flex gap-2 ">
        <div className="w-[75%] flex flex-col h-full bg-white/60 p-2 rounded-xl">
          <ProductProvider>
            <ProductSection />
          </ProductProvider>
        </div>

        <div className="h-full w-[25%] bg-white/60 p-2 rounded-xl">
          <CategorySection />
        </div>
      </div>
    </CategoryProvider>
  );
}

export default ProductsScreen;
