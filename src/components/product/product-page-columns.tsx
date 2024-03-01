import { memo } from "react";
import { getMinMax, numberWithCommas } from "../../utils";
import { CategoryType, ProductType, ProductsWithOptionsType, TableColumns } from "../../utils/types";
import { getCategoriesAction } from "../../stores/category";
import EditProductButton from "./product-edit-button";
import DeleteProductButton from "./product-delete-button";

const ProductTableOptions = memo<{ identifier: string }>(({ identifier }) => {
  return (
    <div className="w-fit inline-flex gap-2 items-center">
      <EditProductButton identifier={identifier} />
      <DeleteProductButton identifier={identifier} />
    </div>
  );
});

export const productPageColumns: TableColumns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (record: ProductsWithOptionsType) => <img src={record.image} className="w-10 h-10 rounded-md" />,
  },
  {
    title: "Nom",
    dataIndex: "name",
    width: 100,
  },
  {
    title: "Prix",
    dataIndex: "priceSale",
    render: (record: ProductsWithOptionsType) => (
      <div className="">
        {record.type === "standard"
          ? numberWithCommas(record.priceSale)
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
    render(record: ProductType) {
      return getCategoriesAction().map((cat: CategoryType) => cat.id === record.category && cat.name);
    },
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
    render: (record: ProductsWithOptionsType) => <ProductTableOptions identifier={record.identifier} />,
  },
];
