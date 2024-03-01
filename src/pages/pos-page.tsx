import { memo, useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { genererUIDProduit, numberWithCommas } from "../utils";

import { ProductOptionType, ProductsWithOptionsType, SaleItemsType, SalesType } from "../utils/types";

import Cart from "../components/cart";
import NumericPad from "../components/numeric-pad";
import Modal from "../components/ui/modal";
import Receipt from "../components/ui/receipt";
import TextField from "../components/ui/text-field";
import Chips from "../components/ui/chips";
import Popup from "../components/ui/popup";
import SelectOption from "../components/product/select-option";
import useCartStore from "../stores/cart";
import useCategoryStore from "../stores/category";
import useSaleStore from "../stores/sale";
import ProductCard from "../components/product/product-card";
import useProductStore from "../stores/product";
import { playBeep, playSwitchClicked } from "../utils/interactive-sound";

interface CardNumberProps {
  title: string;
  content: number | string;
  focus?: boolean;
}

function CardNumber({ title, content, focus = false }: CardNumberProps) {
  return (
    <div className={`rounded-md w-auto py-2 px-2 ${focus ? "bg-primary-200 text-primary-800" : " bg-primary-700 text-primary-50"}`}>
      <div className="text-xs">{title}</div>
      <div>
        <div className="text-2xl -mt-1 text-right font-bold"> {content} </div>
      </div>
    </div>
  );
}

function AddDeposit({ divisible }: { divisible: number }) {
  const addDeposit = useCartStore((state) => state.addDeposit);
  const cartTotal = useCartStore((state) => state.cartTotal);

  return (
    <button
      onClick={() => {
        addDeposit(cartTotal / divisible);
        playBeep();
      }}
      className="w-full p-1 bg-primary-700 rounded-md"
    >
      {Number((cartTotal / divisible).toPrecision(4))}
    </button>
  );
}

function CartTotal() {
  const cartTotal = useCartStore((state) => state.cartTotal);
  return <CardNumber title="MONTANT A PAYER" content={numberWithCommas(cartTotal)} />;
}

function CartDeposit() {
  const cartDeposit = useCartStore((state) => state.cartDeposit);
  return <CardNumber title="MONTANT REÇU" content={numberWithCommas(cartDeposit)} />;
}

function CartDiscount() {
  // const cartDeposit = useCartStore((state) => state.cartDeposit);
  return <CardNumber title="REDUCTION" content={0} />;
}

function CartDiff() {
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartDeposit = useCartStore((state) => state.cartDeposit);
  return (
    <CardNumber
      focus
      title={cartTotal - cartDeposit < 0 ? "MONNAIE :" : cartTotal - cartDeposit > 0 ? "RÉSTANT :" : "OK"}
      content={numberWithCommas(Number((cartTotal - cartDeposit).toPrecision(4)))}
    />
  );
}

function PayButton() {
  const [showModalReceipt, setShowModalReceipt] = useState<boolean>(false);
  const [receiptNo, setReceiptNo] = useState<string>("");

  const receiptRef = useRef<HTMLDivElement | null>(null);
  const cartClient = useCartStore((state) => state.cartClient);
  const cartProducts = useCartStore((state) => state.cartProducts);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const cartDeposit = useCartStore((state) => state.cartDeposit);
  const clearCart = useCartStore((state) => state.clearCart);
  const addSale = useSaleStore((state) => state.addSale);

  const beforePrint = () => {
    const sale: SalesType = {
      id: 0,
      date: new Date(),
      amount: cartTotal,
      discount: 0,
      advance: cartDeposit,
      itemsNumbers: cartProducts.length,
      customer: cartClient,
    };

    const saleItems: SaleItemsType[] = cartProducts.map((product) => ({
      id: 0,
      saleId: 0,
      identifier: product.identifier,
      quantity: product.quantity,
      price: product.price,
      discount: 0,
    }));

    addSale(sale, saleItems);
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    onBeforePrint: () => beforePrint(),
    onAfterPrint: () => {
      setShowModalReceipt(false);
      clearCart();
    },
    onPrintError: () => alert("Erreur d'impression."),
  });

  const viewReceipt = () => {
    playSwitchClicked();
    setShowModalReceipt(true);
    const NO = genererUIDProduit();
    setReceiptNo(`R-${NO}`);
  };

  return (
    <>
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
            clientId={cartClient}
            products={cartProducts}
          />
        }
      />
      <div className="p-0">
        <button
          disabled={cartTotal === 0}
          onClick={viewReceipt}
          className={`h-fit  bg-primary-200 text-primary-900 text-center text-3xl font-bold w-full py-3 focus:outline-none rounded-md`}
        >
          PAYER
        </button>
      </div>
    </>
  );
}

const ProductItem = memo<{ product: ProductsWithOptionsType }>(({ product }) => {
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [productOptions, setProductOptions] = useState<ProductOptionType[] | null>(null);

  const addProduct = useCartStore((state) => state.addProduct);

  const handleAddProduct = useCallback(
    (product: ProductsWithOptionsType) => {
      // playBeep();
      if (product.options && product.type === "variable") {
        setProductOptions(product.options);
        setShowSelectPopup(true);
        return;
      }
      addProduct(product.identifier);
    },
    [addProduct]
  );

  const reset = () => {
    setShowSelectPopup(false);
    setProductOptions(null);
  };

  return (
    <div>
      <Popup
        title="Choisir une option"
        showPopup={showSelectPopup}
        setShowPopup={setShowSelectPopup}
        content={<SelectOption options={productOptions} onSelectOption={(idenfier) => addProduct(idenfier, reset)} />}
      />
      <ProductCard values={product} handleClick={handleAddProduct} />
    </div>
  );
});

function ProductsList({ filterByName, filterByCategory }) {
  const products = useProductStore((state) => state.products);
  return (
    <div className="grid grid-cols-5 gap-1 h-fit w-full">
      {products
        .filter((product) => product.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))
        .filter((product) => (filterByCategory == 0 ? product : product.category == filterByCategory))
        .map((product, i) => (
          <ProductItem key={i} product={product} />
        ))}
    </div>
  );
}

function ProductSection() {
  const [productFilterByName, setProductFilterByName] = useState("");
  const [productFilterByCategory, setProductFilterByCategory] = useState(0);

  const categories = useCategoryStore((state) => state.categories);

  return (
    <div className="w-full h-full flex flex-col gap-2">
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
              handleClick={() => {
                setProductFilterByCategory(0);
                playBeep();
              }}
              active={productFilterByCategory === 0}
              text={"Tout"}
              icon={<div className="w-4 h-4 rounded-full bg-primary-100" />}
            />
            {categories.map((category, i) => (
              <Chips
                key={i}
                handleClick={() => {
                  setProductFilterByCategory(category.id ? category.id : 0);
                  playBeep();
                }}
                active={productFilterByCategory === category.id}
                text={category.name}
                icon={<div style={{ backgroundColor: category.color }} className="w-4 h-4 rounded-full" />}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-full overflow-y-scroll px-1">
        <div className="h-full w-full">
          <ProductsList filterByName={productFilterByName} filterByCategory={productFilterByCategory} />
        </div>
      </div>
    </div>
  );
}

function BoxSection() {
  const cartDeposit = useCartStore(useCallback((state) => state.cartDeposit, []));
  const addDeposit = useCartStore(useCallback((state) => state.addDeposit, []));

  const handleNumeric = (e: any) => {
    playBeep();
    const newDeposit = cartDeposit.toString() + e.target.value;
    addDeposit(Number(newDeposit));
  };

  const handleClear = () => {
    addDeposit(0);
    playSwitchClicked();
  };

  const { innerHeight: height } = window;

  return (
    <div className="w-full h-full gap-2 flex flex-col justify-between ">
      <div className="h-full w-full flex flex-col justify-between ">
        <div className="h-fit w-full flex flex-col gap-2">
          <CartTotal />
          <CartDiscount />
          <CartDeposit />
        </div>

        <div style={{ height: `${height / 14}%` }} className="w-full flex flex-col">
          <div className="w-full flex gap-2 text-white">
            <AddDeposit divisible={3} />
            <AddDeposit divisible={2} />
            <AddDeposit divisible={1} />
          </div>

          <hr className="my-2 border-primary-500" />

          <NumericPad handleNumeric={handleNumeric} handleClear={handleClear} variant="dark" />
        </div>
      </div>

      <PayButton />
    </div>
  );
}

function PosPage() {
  return (
    <div className="flex-row flex gap-2 h-full w-full overflow-hidden">
      <div className="w-1/2 h-full overflow-hidden bg-white/60 border border-primary-100/50 p-2 rounded-xl">
        <ProductSection />
      </div>

      <div className="w-1/4 rounded-xl overflow-hidden bg-white/60 border border-primary-100/50 p-2">
        <Cart />
      </div>

      <div className="rounded-xl w-1/4 p-3 h-full bg-primary-800 text-primary-50 overflow-hidden">
        <BoxSection />
      </div>
    </div>
  );
}
export default PosPage;
