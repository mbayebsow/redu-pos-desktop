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
import TextField from "../components/ui/text-field";
import Chips from "../components/ui/chips";
import { SaleProvider, useSale } from "../contexts/sale-context";
import { numberWithCommas } from "../lib";

interface BoxSectionProps {
  setReceiptNo: (no: string) => void;
  setShowModalReceipt: (show: boolean) => void;
}

function ProductSection() {
  const [productFilterByName, setProductFilterByName] = useState("");
  const [productFilterByCategory, setProductFilterByCategory] = useState(0);
  const { addProduct } = useCart();
  const { categories } = useCategory();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="p-2 w-full h-fit bg-primary-50 rounded-xl flex flex-col gap-2 relative overflow-hidden">
        <div className="h-fit">
          <TextField
            name="search"
            label="Recherche"
            type="text"
            value={productFilterByName}
            clrearValue={() => setProductFilterByName("")}
            onChange={(e) => setProductFilterByName(e.target.value)}
          />
        </div>

        <div className="overflow-x-scroll overflow-y-hidden relative h-[68px] w-full">
          <div className="inline-flex gap-1 w-fit h-fit absolute top-0 bottom-0 left-0">
            <Chips
              handleClick={() => setProductFilterByCategory(0)}
              active={productFilterByCategory === 0}
              text={"Toutes le catégories"}
              icon={<div className="w-4 h-4 rounded-full bg-primary-500" />}
            />
            {categories.map((category, i) => (
              <Chips
                key={i}
                handleClick={() => setProductFilterByCategory(category.id ? category.id : 0)}
                active={productFilterByCategory === category.id}
                text={category.name}
                icon={
                  <div
                    style={{ backgroundColor: category.color }}
                    className="w-4 h-4 rounded-full"
                  />
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-full overflow-y-scroll pr-2">
        <div className="grid grid-cols-5 gap-2 h-fit w-full">
          <ProductsList
            display="card"
            handleClick={addProduct}
            filterByName={productFilterByName}
            filterByCategory={productFilterByCategory}
          />
        </div>
      </div>
    </div>
  );
}

function BoxSection({ setReceiptNo, setShowModalReceipt }: BoxSectionProps) {
  const { playSwitchClicked, playPhoneKeypad } = useSound();
  const { cartTotal, cartDeposit, cartClient, addDeposit } = useCart();

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

  const viewReceipt = () => {
    playSwitchClicked();
    setShowModalReceipt(true);
    const NO = getRandomId();
    setReceiptNo(NO);
  };

  const handleNumeric = (e: any) => {
    playPhoneKeypad();
    const newDeposit = cartDeposit.toString() + e.target.value;
    addDeposit(Number(newDeposit));
  };

  return (
    <div className="w-full h-full gap-2 flex flex-col justify-between ">
      <div className="h-full w-full flex flex-col justify-between ">
        <div className="h-fit w-full flex flex-col gap-2">
          <CardNumber title="MONTANT A PAYER" content={numberWithCommas(cartTotal)} />
          <CardNumber title="MONTANT REÇU" content={numberWithCommas(cartDeposit)} />
          <CardNumber
            focus
            title={
              cartTotal - cartDeposit < 0
                ? "MONNAIE :"
                : cartTotal - cartDeposit > 0
                  ? "RÉSTANT :"
                  : "OK"
            }
            content={numberWithCommas(Number((cartTotal - cartDeposit).toPrecision(4)))}
          />
        </div>

        <div className="w-full h-full flex flex-col mt-16">
          <div className="w-full flex gap-3 text-white">
            <button
              onClick={() => addDeposit(cartTotal / 3)}
              className="w-full p-1 bg-primary-700 rounded-md"
            >
              {Number((cartTotal / 3).toPrecision(4))}
            </button>
            <button
              onClick={() => addDeposit(cartTotal / 2)}
              className="w-full p-1 bg-primary-700 rounded-md"
            >
              {Number((cartTotal / 2).toPrecision(4))}
            </button>
            <button
              onClick={() => addDeposit(cartTotal)}
              className="w-full p-1 bg-primary-200 text-primary-900 rounded-md"
            >
              {Number(cartTotal.toPrecision(4))}
            </button>
          </div>

          <hr className="my-2 border-primary-500" />

          <NumericPad
            handleNumeric={handleNumeric}
            handleClear={() => addDeposit(0)}
            variant="dark"
          />
        </div>
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
  );
}

function Main() {
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const [showModalReceipt, setShowModalReceipt] = useState<boolean>(false);
  const [receiptNo, setReceiptNo] = useState<string>("");
  const { cartTotal, cartDeposit, cartClient, cartProducts, clearCart } = useCart();
  const { addSale } = useSale();

  const beforePrint = () => {
    const sale = {
      id: 0,
      date: new Date(),
      amount: cartTotal,
      discount: 0,
      advance: cartDeposit,
      itemsNumbers: cartProducts.length,
      customer: cartClient ? cartClient.id : null,
    };

    const saleItems = cartProducts.map((product) => ({
      id: 0,
      saleId: 0,
      productId: product.id,
      quantity: product.quantity,
      price: product.price,
    }));

    addSale(sale, saleItems);
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    onBeforePrint: () => beforePrint(),
    onAfterPrint: () => {
      setShowModalReceipt(false);
      clearCart();
      console.log(cartClient);
    },
    onPrintError: () => alert("Erreur d'impression."),
  });

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

      <div className="w-1/2 h-full overflow-hidden">
        <ProductSection />
      </div>

      <div className="w-1/4 rounded-xl overflow-hidden bg-primary-50">
        <Cart />
      </div>

      <div className="rounded-xl w-1/4 p-3 h-full bg-primary-900 text-primary-50 overflow-hidden">
        <BoxSection setReceiptNo={setReceiptNo} setShowModalReceipt={setShowModalReceipt} />
      </div>
    </div>
  );
}

function PosScreen() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <SaleProvider>
          <CartProvider>
            <Main />
          </CartProvider>
        </SaleProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}
export default PosScreen;
