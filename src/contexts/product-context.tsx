import { FC, ChangeEvent, createContext, useContext, ReactNode, useState } from "react";
import { ProductType } from "../types";

import toast from "react-hot-toast";
import productMock from "../mockdata/products.json";
import DB from "../lib/db";

const PRODUCT_DB = new DB("products");

interface ProductContextPropsType {
  products: ProductType[];
  newProductState: any;
  addNewProduct: () => void;
  handleNewProductValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

const INITIAL_PRODUCT = {
  name: null,
  price: 0,
  priceDemi: false,
  unite: "unite",
  isActive: true,
  image: "http://dummyimage.com/100x100.png",
};

const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newProductState, setNewProductState] = useState(INITIAL_PRODUCT);

  const handleNewProductValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, checked } = event.target;

    let VALUE;

    if (value) VALUE = value;
    if (!value && !files) VALUE = checked;
    if (files) {
      var fReader = new FileReader();
      fReader.readAsDataURL(files[0]);
      fReader.onloadend = function () {
        VALUE = fReader.result;
        setNewProductState({ ...newProductState, [name]: VALUE });
        return;
      };
    }
    setNewProductState({ ...newProductState, [name]: VALUE });
  };

  const addNewProduct = () => {
    // toast.loading("Enregistrement du produit");
    // PRODUCT_DB.add(newProductState);

    if (!newProductState.name) {
      toast.error("Le nom du produit est obligatoir");
      return;
    }

    PRODUCT_DB.add(newProductState);
    toast.success("Produit enregistrer.");

    console.log(newProductState);
  };

  return (
    <ProductContext.Provider value={{ products: productMock, newProductState, handleNewProductValue, addNewProduct }}>
      {children}
    </ProductContext.Provider>
  );
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
