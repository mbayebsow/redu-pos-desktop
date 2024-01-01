import { useCart } from "../contexts/CartContext";
import ProductList from "./product/ProductList";

const ExampleComponent = () => {
  const { addProduct } = useCart();

  return (
    <div className="grid grid-cols-5 gap-2 pb-1">
      <ProductList handleClick={addProduct} />
    </div>
  );
};

export default ExampleComponent;
