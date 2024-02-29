import { useState } from "react";

import { CategoryType } from "../utils/types";

import { productScreenColumns } from "../components/shared/table-columns/product-screen-columns";
import { INITIAL_CATEGORY } from "../components/shared/initials-state";

import Modal from "../components/ui/modal";
import Button from "../components/ui/button";
import TextField from "../components/ui/text-field";
import CategoryAdd from "../components/category/category-add";
import SectionTitle from "../components/ui/section-title";
import useProductStore from "../stores/product";
import useCategoryStore from "../stores/category";
import Table from "../components/ui/data-table";
import AddProductButton from "../components/product/product-add-button";

const ProductsList = ({ filterByName }) => {
  const products = useProductStore((state) => state.products);
  return (
    <div>
      <Table
        // handleClick={handleClick}
        columns={productScreenColumns}
        data={products.filter((product) => product.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))}
      />
    </div>
  );
};

function CategorySection() {
  // const { categories, addCategory } = useCategory();
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);

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
        <div className="h-full w-full overflow-y-scroll">
          {categories
            .filter((category) => category.name.toLocaleLowerCase().includes(categorySearchName.toLocaleLowerCase()))
            .map((category, i) => (
              <div key={i} className="border-b py-2 flex gap-2">
                <div style={{ backgroundColor: category.color }} className="h-7 w-7 bg-primary-50 rounded-full overflow-hidden" />
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
  const [searchByName, setSearchByName] = useState("");

  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="w-full">
        <SectionTitle>Produits</SectionTitle>
        <div className="flex justify-between gap-2">
          <div>
            <TextField
              type="text"
              label="Recherche"
              name="search"
              value={searchByName}
              clrearValue={() => setSearchByName("")}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>

          <div className="flex items-end gap-1">
            <div>
              <Button roundedBorder="full" variant="tonal" text="Prix: Tout" />
            </div>
            <div>
              <Button roundedBorder="full" variant="tonal" text="Visibilité: Tout" />
            </div>
            <div>
              <AddProductButton />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll rounded-lg bg-primary-50">
        <ProductsList filterByName={searchByName} />
      </div>
    </div>
  );
}

function ProductsPage() {
  return (
    <div className="w-full h-full flex gap-3">
      <div className="w-[75%] h-full bg-white/60 border border-primary-100/50 rounded-xl p-2">
        <ProductSection />
      </div>

      <div className="h-full w-[25%] bg-white/60 border border-primary-100/50 rounded-xl p-2">
        <CategorySection />
      </div>
    </div>
  );
}

export default ProductsPage;
