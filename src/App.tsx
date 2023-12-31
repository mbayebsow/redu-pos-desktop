import PosHeader from "./components/headers/Pos.header";
import Cart from "./components/Cart";
import NumericPad from "./components/NumericPad";
import ExampleComponent from "./components/ExampleComponent";

import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <div className="overflow-hidden flex flex-col h-full w-full">
      <PosHeader />
      <div className="flex-row p-3 flex gap-2 h-full w-full overflow-hidden">
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
    </div>
  );
}

export default App;
