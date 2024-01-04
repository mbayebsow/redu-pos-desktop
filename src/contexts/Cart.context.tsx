import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ProductType, CartType, ClientType } from "../types";
import useSound from "../hooks/useSound";

import clientsMock from "../mockdata/clients.json";

interface DataContextProps {
  cartProducts: CartType[];
  cartClient: ClientType | null;
  cartTotal: number;
  cartDeposit: number;
  addClient: (id: number) => void;
  addProduct: (product: ProductType) => void;
  clearCart: () => void;
  adjustQty: (product: ProductType, type: "in" | "de") => void;
  addDeposit: (price: number) => void;
}

const CartContext = createContext<DataContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartProducts, setCartProduct] = useState<CartType[]>([]);
  const [cartClient, setCartClient] = useState<ClientType | null>(null);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartDeposit, setCartDeposit] = useState<number>(0);

  const { playBeep, playClear } = useSound();

  const addProduct = (product: ProductType) => {
    playBeep();
    const existIndex = cartProducts.findIndex((p) => p.id === product.id);

    if (existIndex === -1) {
      setCartProduct((prevData) => prevData.concat({ ...product, qty: 1 }));
    } else {
      cartProducts[existIndex].qty++;
      setCartProduct([...cartProducts]);
    }
  };

  const adjustQty = (product: ProductType, type: "in" | "de") => {
    playBeep();
    const existIndex = cartProducts.findIndex((p) => p.id === product.id);
    if (type === "in") cartProducts[existIndex].qty++;
    if (type === "de" && cartProducts[existIndex].qty > 1) cartProducts[existIndex].qty--;
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
    const client = clientsMock.find((c) => c.id === id);
    console.log(client);
    console.log(id);

    setCartClient(client ? client : null);
  };

  useEffect(() => {
    let tPrice: number = 0;
    cartProducts.map((product) => (tPrice = tPrice + product.qty * product.price));
    setCartTotal(Number(tPrice.toPrecision(4)));
  }, [cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts, cartClient, cartTotal, cartDeposit, addClient, addProduct, clearCart, adjustQty, addDeposit }}>
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
