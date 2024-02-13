import { ChangeEvent, useState } from "react";
import { CategoryType, ProductOptionType, ProductType } from "../lib/types";

import { ProductProvider, useProduct } from "../contexts/product-context";
import { CategoryProvider, useCategory } from "../contexts/category-context";

import Modal from "../components/ui/modal";
import Button from "../components/ui/button";
import TextField from "../components/ui/text-field";
import ProductAdd from "../components/product/product-add";
import CategoryAdd from "../components/category/category-add";
import ProductsList from "../components/product/products-list";
import SectionTitle from "../components/ui/section-title";
import { Plus } from "lucide-react";

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
  price: 0,
  identifier: "",
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

  const handleOptionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedOptions = [...productOptions];
    updatedOptions[index][name] = name === "name" ? value : Number(value);
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

  const resetValue = () => {
    setNewProduct(INITIAL_PRODUCT);
    setProductOptions([
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

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={
          <ProductAdd
            productValue={newProduct}
            productOptions={productOptions}
            handleProductValue={setNewProduct}
            handleAddOption={handleAddOption}
            handleOptionChange={handleOptionChange}
          />
        }
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={() => addProduct(newProduct, productOptions, resetValue)}
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
              icon={<Plus />}
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
        <div className="w-[75%] h-full bg-white/60 p-2 rounded-xl">
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
