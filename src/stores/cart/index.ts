import { create } from "zustand";
import { CUSTOMERS_DB } from "../../db/db";
import { CartType, CustomerType, ProductType } from "../../utils/types";
import { getproductByIdentifierAction } from "../product";
import { playBeep, playClear } from "../../utils/interactive-sound";

interface DataContextProps {
  cartProducts: CartType[];
  cartClient: CustomerType | null;
  cartTotal: number;
  cartDeposit: number;
  addClient: (id: number) => void;
  addProduct: (identifier: string, callBack?: () => void) => void;
  clearCart: () => void;
  updateCartTotal: () => void;
  adjustQuantity: (product: CartType, type: "in" | "de") => void;
  addDeposit: (price: number) => void;
}

const convertProductToCartType = (product: ProductType) => {
  const newProductCart = {
    productName: product.name,
    productImage: product.image,
    productUnit: product.unit,
    identifier: product.identifier,
    price: product.priceSale,
    quantity: 1,
    discount: 0,
  };
  return newProductCart;
};

const useCartStore = create<DataContextProps>((set, get) => ({
  cartProducts: [],
  cartClient: null,
  cartTotal: 0,
  cartDeposit: 0,
  updateCartTotal: () => {
    let tPrice: number = 0;
    get().cartProducts.map((product) => (tPrice = tPrice + product.quantity * product.price));
    set(() => ({ cartTotal: Number(tPrice.toPrecision(4)) }));
  },
  addClient: (id: number) => {
    const client = CUSTOMERS_DB.getById(id);
    if (client.data) set(() => ({ cartClient: client.data }));
    playBeep();
  },
  addProduct: (identifier: string, callBack?: () => void) => {
    const product = getproductByIdentifierAction(identifier);

    if (product) {
      const cartProducts = get().cartProducts;
      const existIndex = cartProducts.findIndex((p) => p.identifier === identifier);

      if (existIndex === -1) {
        set((state) => ({ cartProducts: [...state.cartProducts, convertProductToCartType(product)] }));
      } else {
        cartProducts[existIndex].quantity++;
        set(() => ({ cartProducts: [...cartProducts] }));
      }

      get().updateCartTotal();
      callBack && callBack();
      playBeep();
    }
  },
  clearCart: () => {
    set(() => ({
      cartProducts: [],
      cartClient: null,
      cartTotal: 0,
      cartDeposit: 0,
    }));
    playClear();
  },
  adjustQuantity: (product: CartType, type: "in" | "de") => {
    const cartProducts = get().cartProducts;
    const existIndex = cartProducts.findIndex((p) => p.identifier === product.identifier);
    if (existIndex === -1) return;

    if (type === "in") cartProducts[existIndex].quantity++;
    if (type === "de" && cartProducts[existIndex].quantity > 1) cartProducts[existIndex].quantity--;
    set(() => ({ cartProducts: [...cartProducts] }));
    get().updateCartTotal();
  },
  addDeposit: (price: number) => set(() => ({ cartDeposit: Number(price.toPrecision(4)) })),
}));

export default useCartStore;
