import toast from "react-hot-toast";
import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ProductOptionType, ProductType } from "../lib/types";
import { PRODUCTOPTIONS_DB, PRODUCT_DB } from "../lib/db";
import { genererUIDProduit } from "../lib";

interface ProductContextPropsType {
  products: ProductType[] | [];
  productOptions: ProductOptionType[] | [];
  addProduct: (
    product: ProductType,
    productOptions: ProductOptionType[],
    callback?: () => void
  ) => any;
  deleteProduct: (id: number) => void;
  getproductById: (productId: number) => {
    success: boolean;
    message?: string;
    data?: ProductType | undefined;
  };
}

const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[] | []>([]);
  const [productOptions, setProductOptions] = useState<ProductOptionType[] | []>([]);

  const getproducts = () => {
    const P = PRODUCT_DB.getAll();
    if (P) setProducts(P);
  };

  const getproductOptions = () => {
    const P = PRODUCTOPTIONS_DB.getAll();
    if (P) setProductOptions(P);
  };

  const getproductById = (id: number) => {
    const P = PRODUCT_DB.getById(id);
    return P;
  };

  const deleteProduct = (id: number) => {
    PRODUCT_DB.delete(id);
    getproducts();
  };

  const addProduct = (
    product: ProductType,
    productOptions: ProductOptionType[],
    callback?: () => void
  ) => {
    if (product.name === "") {
      toast.error("Le nom du produit est obligatoir");
      return;
    }

    if (product.type === "standard" && product.price === 0) {
      toast.error("Le prix est obligatoir");
      return;
    }

    const identifier = genererUIDProduit();

    const newProduct = PRODUCT_DB.add({ ...product, identifier });

    if (!newProduct.success) {
      toast.error("Une erreur c'est produite. Ressayer!");
      return;
    }

    if (newProduct.data && product.type === "variable") {
      const ProductID = newProduct.data.id;
      const optionWithProductID = productOptions.map((option) => ({ ...option, ProductID }));

      const saveProductOptions = PRODUCTOPTIONS_DB.addBatch(optionWithProductID);
      if (!saveProductOptions.success)
        toast.error("Une erreur c'est produite lors de l'enregistrement des options!");
    }
    toast.success("Produit ajouter avec succes!");
    getproducts();
    callback && callback();
  };

  useEffect(() => {
    getproducts();
    getproductOptions();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        productOptions,
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
