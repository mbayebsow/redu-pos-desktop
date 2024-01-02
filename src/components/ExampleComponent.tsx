import { useCart } from "../contexts/Cart.context";
import ProductList from "./product/ProductsList";

const ExampleComponent = () => {
  const { addProduct } = useCart();

  return (
    <div className="grid grid-cols-5 gap-2 pb-1 h-full w-full overflow-scroll">
      <ProductList handleClick={addProduct} />
    </div>
  );
};

export default ExampleComponent;
