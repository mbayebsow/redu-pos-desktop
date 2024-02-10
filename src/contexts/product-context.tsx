import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { DataBaseResponse, ProductType } from "../lib/types";
import { PRODUCT_DB } from "../lib/db";

interface ProductContextPropsType {
  products: ProductType[] | null;
  addProduct: (product: ProductType) => DataBaseResponse<ProductType>;
  deleteProduct: (id: number) => void;
  getproductById: (productId: number) => {
    success: boolean;
    message?: string;
    data?: ProductType | undefined;
  };
}

const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  const getproducts = () => {
    const P = PRODUCT_DB.getAll();
    if (P) setProducts(P);
  };

  const getproductById = (id: number) => {
    const P = PRODUCT_DB.getById(id);
    return P;
  };

  const deleteProduct = (id: number) => {
    PRODUCT_DB.delete(id);
    getproducts();
  };

  const addProduct = (product: ProductType) => {
    const add = PRODUCT_DB.add(product);
    getproducts();
    return add;
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        getproductById,
      }}
    >
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
