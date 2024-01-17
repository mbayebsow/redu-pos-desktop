import { useProduct } from "../../contexts/product-context";
import { ProductType } from "../../types";

interface ProductListProps {
  display?: "list" | "card";
  handleClick: (product: ProductType) => void;
}
interface ProductProps {
  image: string;
  name: string;
  price: number;
  display?: "list" | "card";
  handleClick: () => void;
}

function Product({ handleClick, image, name, price, display }: ProductProps) {
  return (
    <div
      onClick={handleClick}
      className={`${
        display === "list" ? "flex gap-5 m-0 border-b" : "rounded-xl"
      } p-1 h-fit w-full  productItem cursor-pointer overflow-hidden hover:border`}
    >
      <img
        src={image}
        alt={name}
        className={` ${display === "list" ? "w-16" : "w-full"}  h-auto rounded-lg overflow-hidden aspect-square object-cover`}
      />
      <div className="p-2">
        <p className="flex-grow truncate mr-1 text-xs">{name}</p>
        <p className="nowrap font-semibold text-sm">{price}</p>
      </div>
    </div>
  );
}

function ProductsList({ display = "list", handleClick }: ProductListProps) {
  const { products } = useProduct();

  return products ? (
    products.map((product) => (
      <Product
        key={product.id}
        handleClick={() => handleClick(product)}
        name={product.name}
        price={product.price}
        image={product.image}
        display={display}
      />
    ))
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
