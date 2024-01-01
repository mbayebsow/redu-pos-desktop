import { useProduct } from "../../contexts/ProductContext";
import { ProductType } from "../../types";

interface ProductListProps {
  handleClick: (product: ProductType) => void;
}

function ProductList({ handleClick }: ProductListProps) {
  const { state } = useProduct();

  return state.products.map((product) => (
    <div
      key={product.id}
      onClick={() => handleClick(product)}
      className="p-1 h-40 rounded-md productItem cursor-pointer select-none transition-shadow overflow-hidden bg-white shadow hover:shadow-lg"
    >
      <img src={product.image} alt={product.name} className="h-2/3 w-full rounded-md" />
      <div className="p-2">
        <p className="flex-grow truncate mr-1 text-xs">{product.name}</p>
        <p className="nowrap font-semibold text-sm">{product.price}</p>
      </div>
    </div>
  ));
}

export default ProductList;
