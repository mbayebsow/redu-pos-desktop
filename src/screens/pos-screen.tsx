import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { ProductProvider } from "../contexts/product-context";
import { CartProvider, useCart } from "../contexts/cart-context";
import { CategoryProvider, useCategory } from "../contexts/category-context";

import Cart from "../components/pos/cart";
import NumericPad from "../components/pos/numeric-pad";
import Modal from "../components/ui/modal";
import Receipt from "../components/ui/receipt";
import ProductsList from "../components/product/products-list";
import CardNumber from "../components/ui/card-number";
import useSound from "../hooks/useSound";
import Button from "../components/ui/button";
import TextField from "../components/ui/text-field";

function Main() {
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const [showModalReceipt, setShowModalReceipt] = useState<boolean>(false);
  const [productSearchName, setProductSearchName] = useState("");
  const [receiptNo, setReceiptNo] = useState<string>("");
  const { cartTotal, cartDeposit, cartClient, cartProducts, addProduct, clearCart } = useCart();
  const { categories } = useCategory();
  const { playSwitchClicked } = useSound();

  const getRandomId = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const NO =
      "RP/" +
      `${cartClient ? cartClient.firstName[0] + cartClient.lastName[0] : "NC"}` +
      "/" +
      num.toString().padStart(6, "0");
    return NO;
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    onBeforePrint: () => console.log("save to sale DB"),
    onAfterPrint: () => {
      setShowModalReceipt(false);
      clearCart();
    },
    onPrintError: () => alert("Erreur d'impression."),
  });

  const viewReceipt = () => {
    playSwitchClicked();
    setShowModalReceipt(true);
    const NO = getRandomId();
    setReceiptNo(NO);
  };

  return (
    <div className="flex-row flex gap-2 h-full w-full overflow-hidden">
      <Modal
        actionButtonShow
        actionButtonText="Valider"
        actionButtonOnClick={handlePrint}
        setShowModal={setShowModalReceipt}
        showModal={showModalReceipt}
        content={
          <Receipt
            receiptRef={receiptRef}
            totalPrice={cartTotal}
            deposit={cartDeposit}
            receiptNo={receiptNo}
            client={cartClient}
            products={cartProducts}
          />
        }
      />

      <div className="w-1/2 flex flex-col gap-2 h-fit">
        <div className="p-2 w-full bg-primary-50 rounded-xl flex flex-col gap-2 relative overflow-hidden">
          <TextField
            name="search"
            label="Recherche"
            type="text"
            value={productSearchName}
            clrearValue={() => setProductSearchName("")}
            onChange={(e) => setProductSearchName(e.target.value)}
          />

          <div className="overflow-x-scroll relative h-10 w-full">
            <div className="inline-flex gap-1 w-fit h-fit absolute top-0 bottom-0 left-0">
              {categories.map((category) => (
                <Button
                  icon={
                    <div
                      style={{ backgroundColor: category.color }}
                      className="w-4 h-4 rounded-full"
                    />
                  }
                  variant="tonal"
                  text={category.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-full overflow-y-scroll">
          <div className="grid grid-cols-5 gap-2 h-fit w-full relative">
            <ProductsList
              display="card"
              handleClick={addProduct}
              filterByName={productSearchName}
            />
          </div>
        </div>
      </div>

      <div className="w-1/4 rounded-xl overflow-hidden bg-primary-50">
        <Cart />
      </div>

      <div className="shadow rounded-xl w-1/4 p-3 gap-2 flex flex-col justify-between h-full bg-primary-900 text-primary-50 overflow-hidden">
        <div className="h-full w-full flex flex-col justify-between ">
          <div className="h-fit w-full flex flex-col gap-2">
            <CardNumber title="MONTANT A PAYER" content={cartTotal} />
            <CardNumber title="MONTANT REÇU" content={cartDeposit} />
            <div className="text-xs w-full">
              {cartTotal - cartDeposit === 0 ? (
                ""
              ) : (
                <div className="bg-primary-700 p-2 w-full rounded-md flex justify-between items-center">
                  <div>
                    {cartTotal - cartDeposit < 0
                      ? "MONNAIE :"
                      : cartTotal - cartDeposit > 0 && "RÉSTANT :"}
                  </div>
                  <div>{Number((cartTotal - cartDeposit).toPrecision(4))}</div>
                </div>
              )}
            </div>
          </div>
          <NumericPad />
        </div>
        <div className="p-0">
          <button
            disabled={cartTotal === 0}
            onClick={viewReceipt}
            className={`h-fit  bg-primary-200 text-primary-900 text-center text-3xl font-bold w-full py-3 focus:outline-none rounded-md`}
          >
            PAYER
          </button>
        </div>
      </div>
    </div>
  );
}

function PosScreen() {
  return (
    <CartProvider>
      <ProductProvider>
        <CategoryProvider>
          <Main />
        </CategoryProvider>
      </ProductProvider>
    </CartProvider>
  );
}
export default PosScreen;
