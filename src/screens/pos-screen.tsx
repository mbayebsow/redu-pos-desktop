import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { genererUIDProduit, numberWithCommas } from "../lib";

import { ProductOptionType, ProductsWithOptionsType } from "../lib/types";

import useSound from "../hooks/useSound";

import { ProductProvider } from "../contexts/product-context";
import { CartProvider, useCart } from "../contexts/cart-context";
import { CategoryProvider, useCategory } from "../contexts/category-context";
import { SaleProvider, useSale } from "../contexts/sale-context";

import Cart from "../components/cart";
import NumericPad from "../components/numeric-pad";
import ProductsList from "../components/product/products-list";
import Modal from "../components/ui/modal";
import Receipt from "../components/ui/receipt";
import CardNumber from "../components/ui/card-number";
import TextField from "../components/ui/text-field";
import Chips from "../components/ui/chips";
import Popup from "../components/ui/popup";
import SelectOption from "../components/shared/select-option";

interface BoxSectionProps {
  setReceiptNo: (no: string) => void;
  setShowModalReceipt: (show: boolean) => void;
}

function ProductSection() {
  const [productFilterByName, setProductFilterByName] = useState("");
  const [productFilterByCategory, setProductFilterByCategory] = useState(0);
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [productOptions, setProductOptions] = useState<ProductOptionType[] | null>(null);
  const { addProduct } = useCart();
  const { categories } = useCategory();

  const reset = () => {
    setShowSelectPopup(false);
    setProductOptions(null);
  };

  const handleAddProduct = (product: ProductsWithOptionsType) => {
    if (product.options && product.type === "variable") {
      setProductOptions(product.options);
      setShowSelectPopup(true);
      return;
    }
    addProduct(product.identifier);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Popup
        title="Choisir une option"
        showPopup={showSelectPopup}
        setShowPopup={setShowSelectPopup}
        content={
          <SelectOption
            options={productOptions}
            onSelectOption={(idenfier) => addProduct(idenfier, reset)}
          />
        }
      />

      <div className=" w-full h-fit flex flex-col gap-2 relative overflow-hidden">
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

        <div className="overflow-x-scroll overflow-y-hidden relative h-[48px] w-full">
          <div className="inline-flex gap-1 w-fit h-fit absolute top-0 bottom-0 left-0">
            <Chips
              handleClick={() => setProductFilterByCategory(0)}
              active={productFilterByCategory === 0}
              text={"Tout"}
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

      <div className="relative w-full h-full overflow-y-scroll px-1">
        <div className="grid grid-cols-5 gap-1 h-fit w-full">
          <ProductsList
            display="card"
            handleClick={handleAddProduct}
            filterByName={productFilterByName}
            filterByCategory={productFilterByCategory}
          />
        </div>
      </div>
    </div>
  );
}

function BoxSection({ setReceiptNo, setShowModalReceipt }: BoxSectionProps) {
  const { playSwitchClicked, playButtonPress, playBeep } = useSound();
  const { cartTotal, cartDeposit, addDeposit } = useCart();

  const viewReceipt = () => {
    playBeep();
    setShowModalReceipt(true);
    const NO = genererUIDProduit();
    setReceiptNo(`R-${NO}`);
  };

  const handleNumeric = (e: any) => {
    playBeep();
    const newDeposit = cartDeposit.toString() + e.target.value;
    addDeposit(Number(newDeposit));
  };

  const { innerHeight: height } = window;

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

        <div style={{ height: `${height / 14}%` }} className="w-full flex flex-col">
          <div className="w-full flex gap-2 text-white">
            <button
              onClick={() => {
                addDeposit(cartTotal / 3);
                playButtonPress();
              }}
              className="w-full p-1 bg-primary-700 rounded-md"
            >
              {Number((cartTotal / 3).toPrecision(4))}
            </button>
            <button
              onClick={() => {
                addDeposit(cartTotal / 2);
                playButtonPress();
              }}
              className="w-full p-1 bg-primary-700 rounded-md"
            >
              {Number((cartTotal / 2).toPrecision(4))}
            </button>
            <button
              onClick={() => {
                addDeposit(cartTotal);
                playButtonPress();
              }}
              className="w-full p-1 bg-primary-200 text-primary-900 rounded-md"
            >
              {Number(cartTotal.toPrecision(4))}
            </button>
          </div>

          <hr className="my-2 border-primary-500" />

          <NumericPad
            handleNumeric={handleNumeric}
            handleClear={() => {
              addDeposit(0);
              playSwitchClicked();
            }}
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
      identifier: product.identifier,
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

      <div className="w-1/2 h-full overflow-hidden bg-white/60 p-2 rounded-xl">
        <ProductSection />
      </div>

      <div className="w-1/4 rounded-xl overflow-hidden bg-white/60 p-2">
        <Cart />
      </div>

      <div className="rounded-xl w-1/4 p-3 h-full bg-primary-800 text-primary-50 overflow-hidden">
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
