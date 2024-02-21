import toast from "react-hot-toast";
import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { ProductOptionType, ProductType, ProductsWithOptionsType } from "../lib/types";
import { PRODUCTOPTIONS_DB, PRODUCT_DB } from "../lib/db";
import { generateIdentifier } from "../lib";

interface ProductContextPropsType {
  products: ProductsWithOptionsType[] | [];
  productOptions: ProductOptionType[] | [];
  addProduct: (
    product: ProductType,
    productOptions: ProductOptionType[],
    callback?: () => void
  ) => any;
  deleteProduct: (id: number) => void;
  getproductById: (identifier: string) => ProductType | undefined;
}

const ProductContext = createContext<ProductContextPropsType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductsWithOptionsType[] | []>([]);
  const [productOptions, setProductOptions] = useState<ProductOptionType[] | []>([]);

  const getproducts = () => {
    const P = PRODUCT_DB.getAll();
    const PWOption = PRODUCTOPTIONS_DB.getAll();
    const standardProducts = P.filter((product) => product.type === "standard");
    const variableProducts = P.filter((product) => product.type === "variable");
    const variableProductsWithOptions = variableProducts.map((product) => {
      const options = PWOption.filter((option) => option.ProductID === product.id);
      return { ...product, options };
    });

    const finalProducts: ProductsWithOptionsType[] = standardProducts
      .concat(variableProductsWithOptions)
      .sort((a, b) => a.id - b.id);

    setProducts(finalProducts);
  };

  const getproductOptions = () => {
    const P = PRODUCTOPTIONS_DB.getAll();
    if (P) setProductOptions(P);
  };

  const getproductById = (identifier: string) => {
    const regexProductOption = /^\d{6}-\d{6}-\d$/;
    const regexProduct = /^\d{6}-\d{6}$/;

    if (regexProductOption.test(identifier)) {
      const option = PRODUCTOPTIONS_DB.getAll().filter(
        (option) => option.identifier === identifier
      )[0];
      const product = PRODUCT_DB.getById(option.ProductID).data;
      if (!product) return;
      const productCart = {
        id: product.id,
        identifier: identifier,
        name: product.name + "*" + option.name,
        priceCost: option.priceCost,
        price: option.priceSale,
        stockQuantity: option.stockQuantity,
        category: product.category,
        isActive: product.isActive,
        unit: product.unit,
        type: product.type,
        image: product.image,
      };

      return productCart;
    } else if (regexProduct.test(identifier)) {
      const product = PRODUCT_DB.getAll().filter((product) => product.identifier === identifier)[0];

      const productCart = {
        id: product.id,
        identifier: identifier,
        name: product.name,
        priceCost: product.priceCost,
        price: product.price,
        stockQuantity: product.stockQuantity,
        category: product.category,
        isActive: product.isActive,
        unit: product.unit,
        type: product.type,
        image: product.image,
      };

      return productCart;
    } else {
      return undefined;
    }
  };

  const deleteProduct = (id: number) => {
    PRODUCT_DB.delete(id);
    const options = PRODUCTOPTIONS_DB.getAll();
    options.map((option) => {
      if (option.ProductID === id) PRODUCTOPTIONS_DB.delete(option.id);
    });
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

    const identifier = generateIdentifier();

    const newProduct = PRODUCT_DB.add({ ...product, identifier });

    if (!newProduct.success) {
      toast.error("Une erreur c'est produite. Ressayer!");
      return;
    }

    if (newProduct.data && product.type === "variable") {
      const ProductID = newProduct.data.id;
      const optionWithProductID = productOptions.map((option, i) => ({
        ...option,
        identifier: `${identifier}-${i + 1}`,
        ProductID,
      }));

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
