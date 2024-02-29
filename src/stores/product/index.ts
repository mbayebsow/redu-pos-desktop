import { create } from "zustand";
import { ProductOptionType, ProductType, ProductsWithOptionsType } from "../../utils/types";
import { PRODUCTOPTIONS_DB, PRODUCT_DB } from "../../db/db";
import toast from "react-hot-toast";
import { generateIdentifier } from "../../utils";
import { addPriceHitoryAction } from "../price-history";

interface ProductStore {
  products: ProductsWithOptionsType[] | [];
  fetchProducts: () => void;
  addProduct: (product: ProductType, productOptions: ProductOptionType[], callback?: () => void) => any;
  editProduct: (product: ProductType, productOptions?: ProductOptionType[], callback?: () => void) => any;
  deleteProduct: (identifier: string) => void;
  getproductByIdentifier: (identifier: string) => ProductType | undefined;
  getproductOptionsById: (ProductID: number) => ProductOptionType[];
}

function isProductIdentifier(identifier: string): boolean {
  return /^\d{6}-\d{6}$/.test(identifier);
}

function isProductOptionIdentifier(identifier: string): boolean {
  return /^\d{6}-\d{6}-\d$/.test(identifier);
}

function updateProduct(identifier: string, productData: Partial<ProductType>) {
  const product = PRODUCT_DB.getAll().find((product) => product.identifier === identifier);

  if (product) {
    let newEntry = productData;

    if (productData.stockQuantity) {
      const newQuantity = product.stockQuantity + productData.stockQuantity;
      newEntry = { ...newEntry, stockQuantity: newQuantity };
    }

    const updateEntry = PRODUCT_DB.update(product.id, newEntry);

    return updateEntry;
  } else {
    return { success: false, message: "Product not found" };
  }
}

function updateProductOption(identifier: string, productOptionData: Partial<ProductOptionType>) {
  const productOption = PRODUCTOPTIONS_DB.getAll().find((option) => option.identifier === identifier);

  if (productOption) {
    let newEntry = productOptionData;

    if (productOptionData.stockQuantity) {
      const newQuantity = productOption.stockQuantity + productOptionData.stockQuantity;
      newEntry = { ...newEntry, stockQuantity: newQuantity };
    }

    const updateEntry = PRODUCTOPTIONS_DB.update(productOption.id, newEntry);

    return updateEntry;
  } else {
    return { success: false, message: "Product not found" };
  }
}

function addPriceHistoryIfNeeded(
  identifier: string,
  data: Partial<ProductType> | Partial<ProductOptionType>,
  oldProductData: ProductType | undefined
) {
  let { priceCost, priceSale, supplier } = data;

  if (priceCost || priceSale) {
    const oldPriceCost = oldProductData?.priceCost || 0;
    const oldPriceSale = oldProductData?.priceSale || 0;

    const newPriceCost = priceCost || oldPriceCost;
    const newPriceSale = priceSale || oldPriceSale;

    if (newPriceCost !== oldPriceCost || newPriceSale !== oldPriceSale) {
      addPriceHitoryAction(identifier, oldPriceCost, oldPriceSale, newPriceCost, newPriceSale, supplier);
    }
  }
}

export const getproductsAction = () => {
  const P = PRODUCT_DB.getAll();
  const PWOption = PRODUCTOPTIONS_DB.getAll();
  const standardProducts = P.filter((product) => product.type === "standard");
  const variableProducts = P.filter((product) => product.type === "variable");
  const variableProductsWithOptions = variableProducts.map((product) => {
    const options = PWOption.filter((option) => option.ProductID === product.id);
    return { ...product, options };
  });

  const finalProducts: ProductsWithOptionsType[] = standardProducts.concat(variableProductsWithOptions).sort((a, b) => a.id - b.id);

  return finalProducts;
};

export const addProductAction = (product: ProductType, productOptions: ProductOptionType[], callback?: () => void) => {
  if (product.name === "") {
    toast.error("Le nom du produit est obligatoir");
    return;
  }

  if (product.type === "standard" && product.priceSale === 0) {
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
    if (!saveProductOptions.success) toast.error("Une erreur c'est produite lors de l'enregistrement des options!");
  }
  toast.success("Produit ajouter avec succes!");
  // getproducts();
  callback && callback();
};

export const deleteProductAction = (identifier: string) => {
  if (isProductOptionIdentifier(identifier)) {
    const option = getproductByIdentifierAction(identifier);

    if (option) {
      const deleteEntry = PRODUCTOPTIONS_DB.delete(option.id);
      return deleteEntry;
    }
  }
  if (isProductIdentifier(identifier)) {
    const product = getproductByIdentifierAction(identifier);
    if (product) {
      const deleteEntry = PRODUCT_DB.delete(product.id);
      const options = PRODUCTOPTIONS_DB.getAll();
      options.map((option) => {
        if (option.ProductID === product.id) PRODUCTOPTIONS_DB.delete(option.id);
      });
      return deleteEntry;
    }
  }
  return { success: false, message: "Produit introuvable" };
};

export const updateProductAction = (identifier: string, data: Partial<ProductType> | Partial<ProductOptionType>) => {
  let response: any;
  const oldProductData = getproductByIdentifierAction(identifier);

  if (isProductOptionIdentifier(identifier)) {
    const updateEntry = updateProductOption(identifier, data);
    response = updateEntry;
  } else if (isProductIdentifier(identifier)) {
    const updateEntry = updateProduct(identifier, data);
    response = updateEntry;
  } else {
    response = { success: false, message: "Produit introuvable" };
  }
  addPriceHistoryIfNeeded(identifier, data, oldProductData);
  return response;
};

export const getproductByIdentifierAction = (identifier: string) => {
  if (isProductOptionIdentifier(identifier)) {
    const option = PRODUCTOPTIONS_DB.getAll().filter((option) => option.identifier === identifier)[0];
    const product = PRODUCT_DB.getById(option.ProductID).data;

    if (!product) return;

    const productCart: ProductType = {
      id: option.id,
      identifier: identifier,
      name: product.name + " * " + option.name,
      priceCost: option.priceCost,
      priceSale: option.priceSale,
      stockQuantity: option.stockQuantity,
      category: product.category,
      isActive: product.isActive,
      supplier: option.supplier,
      unit: product.unit,
      type: product.type,
      image: product.image,
    };

    return productCart;
  } else if (isProductIdentifier(identifier)) {
    const product = PRODUCT_DB.getAll().filter((product) => product.identifier === identifier)[0];
    return product;
  } else {
    return undefined;
  }
};

export const getproductOptionsByIdAction = (ProductID: number) => {
  const options = PRODUCTOPTIONS_DB.getAll().filter((option) => option.ProductID === ProductID);
  return options;
};

const useProductStore = create<ProductStore>((set, get) => ({
  products: getproductsAction(),
  fetchProducts: () => set({ products: getproductsAction() }),
  addProduct: addProductAction,
  deleteProduct: (identifier) => {
    const deleteEntry = deleteProductAction(identifier);
    if (deleteEntry?.success) {
      get().fetchProducts();
      toast.success("Produit supprimer avec succes!");
    } else {
      toast.error("Une erreur c'est produite lors de la suppression du produit!");
    }
  },
  getproductByIdentifier: getproductByIdentifierAction,
  getproductOptionsById: getproductOptionsByIdAction,
  editProduct: (product, productOptions, callback) => {
    const updateProductEntry = updateProductAction(product.identifier, product);
    if (updateProductEntry.success) {
      if (productOptions) {
        productOptions.map((option) => {
          const updateProductOptionEntry = updateProductAction(option.identifier, option);
          if (!updateProductOptionEntry.success) toast.error(`Une erreur c'est produite lors de l'enregistrement des options! ${option.identifier}`);
        });
      }
      callback && callback();
    } else {
      toast.error(`Une erreur c'est produite lors de l'enregistrement du produit! ${updateProductEntry.message}`);
    }
  },
}));

export default useProductStore;
