import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductStateType, ProductContextPropsType } from "../types";
import productMock from "../mockdata/products.json";

const initialState = {
  products: productMock,
};

const reducer = (state: ProductStateType, action: { type: string }): ProductStateType => {
  switch (action.type) {
    case "ADD":
      console.log(state);
      return state;
    case "HIDE":
      console.log(state);
      return state;
    default:
      return state;
  }
};

// Définir le contexte
const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

// Fonction utilitaire pour utiliser le contexte dans un composant
const useProduct = (): ProductContextPropsType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct doit être utilisé à l'intérieur de ProductProvider");
  }
  return context;
};

export { ProductProvider, useProduct };
