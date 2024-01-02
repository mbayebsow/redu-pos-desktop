import { useProduct } from "../../contexts/Product.context";
import { ProductType } from "../../types";

interface ProductListProps {
  handleClick: (product: ProductType) => void;
}
interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  handleClick: () => void;
}

function ProductCard({ handleClick, image, name, price }: ProductCardProps) {
  return (
    <div
      onClick={handleClick}
      className="p-1 h-40 rounded-md productItem cursor-pointer select-none transition-shadow overflow-hidden bg-white shadow hover:shadow-lg"
    >
      <img src={image} alt={name} className="w-full rounded-md overflow-hidden aspect-square object-cover" />
      <div className="p-2">
        <p className="flex-grow truncate mr-1 text-xs">{name}</p>
        <p className="nowrap font-semibold text-sm">{price}</p>
      </div>
    </div>
  );
}

function ProductsList({ handleClick }: ProductListProps) {
  const { state } = useProduct();

  return state.products.map((product) => (
    <ProductCard key={product.id} handleClick={() => handleClick(product)} name={product.name} price={product.price} image={product.image} />
  ));
}

export default ProductsList;
