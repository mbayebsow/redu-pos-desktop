import { useProduct } from "../../contexts/product-context";
import { ProductType } from "../../types";
import Table from "../ui/data-table";

interface ProductListProps {
  display?: "list" | "card";
  handleClick: (product: ProductType) => void;
}
interface ProductProps {
  image: string;
  name: string;
  price: number;
  handleClick: () => void;
}

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: "image",
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
    title: "Unité",
    dataIndex: "unite",
  },
  {
    title: "P-moitie",
    dataIndex: "priceDemi",
  },
  {
    title: "Active",
    dataIndex: "isActive",
  },
];

function Product({ handleClick, image, name, price }: ProductProps) {
  return (
    <div
      onClick={handleClick}
      className="rounded-xl p-1 h-fit w-full  productItem cursor-pointer overflow-hidden bg-primary-50 border-primary-300 hover:border"
    >
      <div className="overflow-hidden aspect-square rounded-lg relative">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <p className="nowrap font-semibold text-xs absolute bottom-0 px-2 py-1 bg-primary-50/50 w-full">{price}</p>
      </div>

      <div className="p-2">
        <p className="flex-grow truncate mr-1 text-xs">{name}</p>
      </div>
    </div>
  );
}

function ProductsList({ display = "list", handleClick }: ProductListProps) {
  const { products } = useProduct();

  return products ? (
    display === "list" ? (
      <Table handleClick={handleClick} columns={columns} data={products}>
        <div className="w-fit inline-flex gap-2 items-center">
          <button className="font-medium text-red-600 fill-primary-800 w-8 h-8 bg-primary-100 p-2 rounded-full">
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <button className="font-medium text-red-600 fill-primary-800 w-8 h-8 bg-primary-100 p-2 rounded-full">
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </div>
      </Table>
    ) : (
      products.map((product) => (
        <Product key={product.id} handleClick={() => handleClick(product)} name={product.name} price={product.price} image={product.image} />
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
