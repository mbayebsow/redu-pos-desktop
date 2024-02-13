import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ProductType, CartType, CustomerType, ProductsWithOptionsType } from "../lib/types";
import useSound from "../hooks/useSound";
import { CUSTOMERS_DB, PRODUCT_DB, PRODUCTOPTIONS_DB } from "../lib/db";
// import clientsMock from "../mockdata/clients.json";

interface DataContextProps {
  cartProducts: CartType[];
  cartClient: CustomerType | null;
  cartTotal: number;
  cartDeposit: number;
  addClient: (id: number) => void;
  addProduct: (identifier: string, callBack?: () => void) => void;
  clearCart: () => void;
  adjustQuantity: (product: CartType, type: "in" | "de") => void;
  addDeposit: (price: number) => void;
}

const CartContext = createContext<DataContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartProducts, setCartProduct] = useState<CartType[]>([]);
  const [cartClient, setCartClient] = useState<CustomerType | null>(null);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartDeposit, setCartDeposit] = useState<number>(0);

  const { playBeep, playClear } = useSound();

  const addToCart = (newProductCart: CartType, identifier: string) => {
    const existIndex = cartProducts.findIndex((p) => p.identifier === identifier);

    if (existIndex === -1) {
      setCartProduct((prevData) => [...prevData, newProductCart]);
    } else {
      cartProducts[existIndex].quantity++;
      setCartProduct([...cartProducts]);
    }
    playBeep();
  };

  const addProduct = (identifier: string, callBack?: () => void) => {
    const regexAvecChiffre = /^\d{3}-\d{6}-\d$/;
    const regexSansChiffre = /^\d{3}-\d{6}$/;

    if (regexAvecChiffre.test(identifier)) {
      const option = PRODUCTOPTIONS_DB.getAll().filter(
        (option) => option.identifier === identifier
      )[0];
      const product = PRODUCT_DB.getById(option.ProductID).data;

      if (!product) return;

      const newProductCart = {
        productName: product.name,
        productImage: product.image,
        productUnit: product.unit,
        identifier: identifier,
        price: option.priceSale,
        optionName: option.name,
        quantity: 1,
      };
      addToCart(newProductCart, identifier);
      callBack && callBack();
    } else if (regexSansChiffre.test(identifier)) {
      const product = PRODUCT_DB.getAll().filter((product) => product.identifier === identifier)[0];

      const newProductCart = {
        productName: product.name,
        productImage: product.image,
        productUnit: product.unit,
        identifier: identifier,
        price: product.price,
        optionName: null,
        quantity: 1,
      };
      addToCart(newProductCart, identifier);
      callBack && callBack();
    } else {
      alert("Format d'identifiant non reconnu");
    }
  };

  const adjustQuantity = (product: CartType, type: "in" | "de") => {
    playBeep();
    const existIndex = cartProducts.findIndex((p) => p.identifier === product.identifier);
    if (type === "in") cartProducts[existIndex].quantity++;
    if (type === "de" && cartProducts[existIndex].quantity > 1) cartProducts[existIndex].quantity--;
    setCartProduct([...cartProducts]);
  };

  const clearCart = () => {
    playClear();
    setCartProduct([]);
    setCartClient(null);
    setCartTotal(0);
    setCartDeposit(0);
  };

  const addDeposit = (price: number) => {
    setCartDeposit(Number(price.toPrecision(4)));
  };

  const addClient = (id: number) => {
    const client = CUSTOMERS_DB.getById(id);
    setCartClient(client.data ? client.data : null);
  };

  useEffect(() => {
    let tPrice: number = 0;
    cartProducts.map((product) => (tPrice = tPrice + product.quantity * product.price));
    setCartTotal(Number(tPrice.toPrecision(4)));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartClient,
        cartTotal,
        cartDeposit,
        addClient,
        addProduct,
        clearCart,
        adjustQuantity,
        addDeposit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): DataContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
