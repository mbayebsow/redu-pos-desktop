import Barcode from "react-jsbarcode";
import { useProduct } from "../../contexts/product-context";
import { ProductType, TableColumns } from "../../lib/types";
import Table from "../ui/data-table";
import ProductTableOptions from "./product-table-options";

interface ProductListProps {
  display?: "list" | "card";
  filterByName?: string;
  filterByCategory?: number | null;
  handleClick?: (product: ProductType) => void;
}
interface ProductProps {
  image: string;
  name: string;
  price: number;
  handleClick: () => void;
}

const columns: TableColumns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (record: ProductType) => <img src={record.image} className="w-10 h-10 rounded-md" />,
  },
  {
    title: "Identifiant",
    dataIndex: "identifier",
    render: (record: ProductType) => (
      <Barcode
        options={{ displayValue: true, fontSize: 35 }}
        className="h-fit w-24"
        value={`${record.identifier}`}
      />
    ),
  },
  {
    title: "Nom",
    dataIndex: "name",
  },
  {
    title: "Prix",
    dataIndex: "price",
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
    render: (record: ProductType) => <ProductTableOptions id={record.id} />,
  },
];

function Product({ handleClick, image, name, price }: ProductProps) {
  return (
    <div
      onClick={handleClick}
      className="rounded-xl p-1 h-fit w-full  productItem cursor-pointer overflow-hidden hover:border hover:shadow-lg"
    >
      <div className="overflow-hidden aspect-square rounded-lg relative">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <p className="nowrap font-semibold text-xs absolute bottom-0 px-2 py-1 bg-primary-50/50 w-full">
          {price}
        </p>
      </div>

      <div className="p-2">
        <p className="flex-grow truncate mr-1 text-xs">{name}</p>
      </div>
    </div>
  );
}

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
          <Product
            key={product.id}
            handleClick={() => (handleClick ? handleClick(product) : null)}
            name={product.name}
            price={product.price}
            image={product.image}
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
