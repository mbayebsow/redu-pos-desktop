import Cart from "../components/Cart";
import NumericPad from "../components/NumericPad";
import ExampleComponent from "../components/ExampleComponent";

import { ProductProvider } from "../contexts/ProductContext";
import { CartProvider } from "../contexts/CartContext";

function PosScreen() {
  return (
    <div className="flex-row flex gap-2 h-full w-full overflow-hidden">
      <CartProvider>
        <div className="w-1/2 h-full overflow-hidden">
          <ProductProvider>
            <ExampleComponent />
          </ProductProvider>
        </div>
        <Cart />
        <NumericPad />
      </CartProvider>
    </div>
  );
}

export default PosScreen;
