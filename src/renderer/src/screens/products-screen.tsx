import { useState } from "react";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { CategoryProvider, useCategory } from "../contexts/category-context";

import TextField from "../components/ui/text-field";
import ProductAdd from "../components/product/product-add";
import ProductsList from "../components/product/products-list";
import Button from "../components/ui/button";
import Modal from "../components/ui/modal";
import CategoryAdd from "../components/category/category-add";
import { CategoryType } from "../lib/types";

const initialSate = {
  id: 0,
  name: "",
  color: "#1e8275",
  isActive: true,
};

function CategorySection() {
  const { categories, addCategory } = useCategory();
  const [opentAddModal, setOpentAddModal] = useState(false);
  const [categorySearchName, setCategorySearchName] = useState("");
  const [categorySate, setCategoryState] = useState<CategoryType>(initialSate);

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
          setCategoryState(initialSate);
        }}
      />
      <div className="w-full h-full flex flex-col justify-between">
        <div className="text-lg mb-2">Catégories</div>
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
  const [searchByName, setSearchByName] = useState("");
  const { addNewProduct } = useProduct();

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={<ProductAdd />}
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={addNewProduct}
      />
      <div className="w-full flex flex-col h-full gap-2">
        <div className="p-2 flex justify-between gap-2 w-full bg-primary-50 rounded-xl">
          <TextField
            type="text"
            label="Recherche"
            name="search"
            value={searchByName}
            clrearValue={() => setSearchByName("")}
            onChange={(e) => setSearchByName(e.target.value)}
          />

          <div className="flex items-end gap-1">
            <Button variant="tonal" text="Prix: Tout" handleClick={() => setOpentAddModal(true)} />
            <Button
              variant="tonal"
              text="Visibilité: Tout"
              handleClick={() => setOpentAddModal(true)}
            />
            <Button text="Ajouter" handleClick={() => setOpentAddModal(true)} />
          </div>
        </div>

        <div className="w-full h-full grid overflow-scroll bg-white rounded-xl">
          <ProductsList filterByName={searchByName} />
        </div>
      </div>
    </>
  );
}

function ProductsScreen() {
  return (
    <CategoryProvider>
      <div className="w-full h-full overflow-hidden flex gap-2">
        <div className="w-[75%] flex flex-col h-full">
          <ProductProvider>
            <ProductSection />
          </ProductProvider>
        </div>

        <div className="h-full w-[25%] bg-primary-50 rounded-xl p-3">
          <CategorySection />
        </div>
      </div>
    </CategoryProvider>
  );
}

export default ProductsScreen;
