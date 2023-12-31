import { useCart } from "../contexts/CartContext";
import { useProduct } from "../contexts/ProductContext";

const ExampleComponent = () => {
  const { state } = useProduct();
  const { addProduct } = useCart();

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 pb-1">
        {state.products.map((product) => (
          <div
            onClick={() => addProduct(product)}
            key={product.id}
            role="button"
            className="p-1 h-40 rounded-md productItem select-none cursor-pointer transition-shadow overflow-hidden bg-white shadow hover:shadow-lg"
          >
            <img src={product.image} alt={product.name} className="h-2/3 w-full rounded-md" />
            <div className="p-2">
              <p className="flex-grow truncate mr-1 text-xs">{product.name}</p>
              <p className="nowrap font-semibold text-sm">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExampleComponent;
