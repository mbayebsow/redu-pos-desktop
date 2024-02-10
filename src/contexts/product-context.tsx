import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ProductType } from "../lib/types";
import { PRODUCT_DB } from "../lib/db";

interface ProductContextPropsType {
  products: ProductType[] | null;
  newProductState: any;
  addNewProduct: () => void;
  deleteProduct: (id: number) => void;
  getproductById: (productId: number) => { success: boolean, message?: string, data?: ProductType | undefined};
  handleNewProductValue: (value: string) => any;
}

const INITIAL_PRODUCT = {
  id: 0,
  name: "",
  price: 0,
  identifier: 0,
  stockQuantity: 0,
  supplier: "",
  category: 0,
  isActive: true,
  image: "http://dummyimage.com/100x100.png",
};

function genererUIDProduit(): number {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const randomDigits = Math.floor(Math.random() * 90000) + 10000;
  const uid = Number(randomDigits + year + month + day + hours + minutes + seconds);

  return uid;
}

const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newProductState, setNewProductState] = useState(INITIAL_PRODUCT);
  const [products, setProducts] = useState<ProductType[] | null>(null);

  const getproducts = () => {
    const P = PRODUCT_DB.getAll();
    if (P) setProducts(P);
  };

  const getproductById = (id: number) => {
    const P = PRODUCT_DB.getById(id);
    return P;
  };

  const handleNewProductValue = (event: string) => {
    console.log(event);
    
    // const { name, value, files, checked } = event.target;

    // let VALUE;

    // if (value) VALUE = value;
    // if (!value && !files) VALUE = checked;
    // if (files) {
    //   var fReader = new FileReader();
    //   fReader.readAsDataURL(files[0]);
    //   fReader.onloadend = function () {
    //     VALUE = fReader.result;
    //     setNewProductState({
    //       ...newProductState,
    //       [name]: name === "price" || name === "stockQuantity" ? Number(VALUE) : VALUE,
    //     });
    //     return;
    //   };
    // }
    // setNewProductState({
    //   ...newProductState,
    //   [name]: name === "price" || name === "stockQuantity" ? Number(VALUE) : VALUE,
    // });
  };

  const addNewProduct = () => {
    if (newProductState.name === "") {
      toast.error("Le nom du produit est obligatoir");
      return;
    }

    if (newProductState.price === 0) {
      toast.error("Le prix est obligatoir");
      return;
    }
    const identifier = genererUIDProduit();

    PRODUCT_DB.add({ ...newProductState, identifier });
    toast.success("Produit enregistrer.");
    setNewProductState(INITIAL_PRODUCT);
    getproducts();
  };

  const deleteProduct = (id: number) => {
    PRODUCT_DB.delete(id);
    getproducts();
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        newProductState,
        handleNewProductValue,
        addNewProduct,
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
