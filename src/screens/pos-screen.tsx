import { useState } from "react";

import { ProductProvider } from "../contexts/product-context";
import { CartProvider, useCart } from "../contexts/cart-context";

import Cart from "../components/pos/cart";
import NumericPad from "../components/pos/numeric-pad";
import Modal from "../components/ui/modal";
import Receipt from "../components/ui/receipt";
import ProductsList from "../components/product/products-list";
import CardNumber from "../components/ui/card-number";

function Main() {
  const [showModal, setShowModal] = useState(false);
  const { cartTotal, cartDeposit, cartClient, cartProducts, addProduct } = useCart();

  return (
    <div className="flex-row flex gap-2 h-full w-full overflow-hidden">
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        content={<Receipt totalPrice={cartTotal} deposit={cartDeposit} receiptNo="34cef" client={cartClient} products={cartProducts} />}
      />
      <div className="w-1/2 h-full overflow-hidden">
        <div className="grid grid-cols-5 gap-2 pb-1 h-full w-full  overflow-y-scroll">
          <ProductsList handleClick={addProduct} />
        </div>
      </div>
      <Cart />
      <div className="shadow rounded-lg w-1/4 flex flex-col justify-between h-full bg-black overflow-hidden">
        <div className="h-full flex flex-col justify-between p-1">
          <div className="h-fit">
            <CardNumber title="TOTAL" content={cartTotal} />
            <CardNumber title="CASH" content={cartDeposit} />
            <CardNumber
              title={cartTotal - cartDeposit < 0 ? "MONNAIE" : cartTotal - cartDeposit > 0 ? "RÉSTE A PAYER" : "---"}
              content={Number((cartTotal - cartDeposit).toPrecision(4))}
              bg={cartTotal - cartDeposit > 0 ? "bg-red-500" : "bg-green-500"}
            />
          </div>
          <NumericPad />
        </div>
        <button
          disabled={cartTotal === 0}
          onClick={() => setShowModal(true)}
          className={`h-fit ${
            cartTotal === 0 ? "bg-green-300" : "bg-green-500"
          } text-white text-center text-3xl font-bold w-full py-3 focus:outline-none`}
        >
          PAYER
        </button>
      </div>
    </div>
  );
}

function PosScreen() {
  return (
    <CartProvider>
      <ProductProvider>
        <Main />
      </ProductProvider>
    </CartProvider>
  );
}
export default PosScreen;
