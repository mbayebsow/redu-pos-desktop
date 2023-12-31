import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductStateType, ProductContextPropsType } from "../types";

const initialState = {
  products: [
    {
      id: 1,
      name: "Produit 1",
      price: 10.99,
      PriceDemi: true,
      Quantité: 5,
      Unité: "kg",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-01-01"),
    },
    {
      id: 2,
      name: "Produit 2",
      price: 5.49,
      PriceDemi: false,
      Quantité: 3,
      Unité: "unité",
      Active: false,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-02-15"),
    },
    {
      id: 3,
      name: "Produit 3",
      price: 8.79,
      PriceDemi: true,
      Quantité: 8,
      Unité: "litre",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-03-20"),
    },
    {
      id: 4,
      name: "Produit 4",
      price: 15.99,
      PriceDemi: false,
      Quantité: 2,
      Unité: "pack",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-04-05"),
    },
    {
      id: 5,
      name: "Produit 5",
      price: 3.99,
      PriceDemi: true,
      Quantité: 10,
      Unité: "unité",
      Active: false,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-05-10"),
    },
    {
      id: 6,
      name: "Produit 1",
      price: 10.99,
      PriceDemi: true,
      Quantité: 5,
      Unité: "kg",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-01-01"),
    },
    {
      id: 7,
      name: "Produit 2",
      price: 5.49,
      PriceDemi: false,
      Quantité: 3,
      Unité: "unité",
      Active: false,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-02-15"),
    },
    {
      id: 8,
      name: "Produit 3",
      price: 8.79,
      PriceDemi: true,
      Quantité: 8,
      Unité: "litre",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-03-20"),
    },
    {
      id: 19,
      name: "Produit 4",
      price: 15.99,
      PriceDemi: false,
      Quantité: 2,
      Unité: "pack",
      Active: true,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-04-05"),
    },
    {
      id: 10,
      name: "Produit 5",
      price: 3.99,
      PriceDemi: true,
      Quantité: 10,
      Unité: "unité",
      Active: false,
      image: "https://placehold.co/400x400",
      Date: new Date("2023-05-10"),
    },
  ],
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
