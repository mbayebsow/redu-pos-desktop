import Barcode from "react-jsbarcode";
import { CategoryType, ProductType, ProductsWithOptionsType, TableColumns } from "../../lib/types";
import { getMinMax, numberWithCommas } from "../../lib";

import { useCategory } from "../../contexts/category-context";
import { useProduct } from "../../contexts/product-context";

import ProductTableOptions from "./product-table-options";
import ProductCard from "./product-card";
import Table from "../ui/data-table";

interface ProductListProps {
  display?: "list" | "card";
  filterByName?: string;
  filterByCategory?: number | null;
  handleClick?: (product: ProductsWithOptionsType) => void;
}

const Category = ({ record }: { record: ProductType }) => {
  const { categories } = useCategory();

  return record.category === 0
    ? "-"
    : categories.map((cat: CategoryType) => cat.id === record.category && cat.name);
};

const columns: TableColumns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (record: ProductsWithOptionsType) => (
      <img src={record.image} className="w-10 h-10 rounded-md" />
    ),
  },
  {
    title: "Identifiant",
    dataIndex: "identifier",
    render: (record: ProductsWithOptionsType) => (
      <Barcode
        options={{ displayValue: true, fontSize: 35 }}
        className="h-fit w-20"
        value={`${record.identifier}`}
      />
    ),
  },
  {
    title: "Nom",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Prix",
    dataIndex: "price",
    render: (record: ProductsWithOptionsType) => (
      <div className="">
        {record.type === "standard"
          ? numberWithCommas(record.price)
          : record.type === "variable" &&
            record.options && (
              <div>
                <div className="whitespace-nowrap flex items-center gap-1">
                  {numberWithCommas(getMinMax(record.options, "priceSale", "min"))}
                  <div className="text-xs">Min</div>
                </div>
                <div className="whitespace-nowrap flex items-center gap-1">
                  {numberWithCommas(getMinMax(record.options, "priceSale", "max"))}
                  <div className="text-xs">Max</div>
                </div>
              </div>
            )}
      </div>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stockQuantity",
  },
  {
    title: "unité",
    dataIndex: "unit",
  },
  {
    title: "Categorie",
    dataIndex: "category",
    render: (record) => <Category record={record} />,
  },
  {
    title: "Fournisseur",
    dataIndex: "supplier",
  },
  {
    title: "Active",
    dataIndex: "isActive",
  },
  {
    title: "Options",
    render: (record: ProductsWithOptionsType) => <ProductTableOptions id={record.id} />,
  },
];

function ProductsList({
  display = "list",
  filterByName = "",
  filterByCategory = 0,
  handleClick,
}: ProductListProps) {
  const { products } = useProduct();

  return products ? (
    display === "list" ? (
      <Table
        handleClick={handleClick}
        columns={columns}
        data={products
          .filter((product) =>
            product.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())
          )
          .filter((product) =>
            filterByCategory == 0 ? product : product.category == filterByCategory
          )}
      />
    ) : (
      products
        .filter((product) =>
          product.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())
        )
        .filter((product) =>
          filterByCategory == 0 ? product : product.category == filterByCategory
        )
        .map((product) => (
          <ProductCard
            key={product.id}
            handleClick={() => (handleClick ? handleClick(product) : null)}
            values={product}
          />
        ))
    )
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-auto absolute">
      <div>
        <svg
          className=" w-60 h-60 fill-primary-200"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </div>
  );
}

export default ProductsList;
