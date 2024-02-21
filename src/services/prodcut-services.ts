import { PRODUCTOPTIONS_DB, PRODUCT_DB } from "../lib/db";
import { ProductOptionType, ProductType } from "../lib/types";
import { addPriceHitory } from "./pricehistory-services";

export const updateProduct = (
  identifier: string,
  data: Partial<ProductType> | Partial<ProductOptionType>
) => {
  const regexProductOption = /^\d{6}-\d{6}-\d$/;
  const regexProduct = /^\d{6}-\d{6}$/;
  const supplier = data.supplier || null;
  const priceCost = data.priceCost;
  const priceSale = data.priceSale;

  if (regexProductOption.test(identifier)) {
    const productOption = PRODUCTOPTIONS_DB.getAll().find(
      (option) => option.identifier === identifier
    );

    if (productOption) {
      let newEntry = data;

      if (data.stockQuantity) {
        const newQuantity = productOption.stockQuantity + data.stockQuantity;
        newEntry = { ...newEntry, stockQuantity: newQuantity };
      }

      const updateEntry = PRODUCTOPTIONS_DB.update(productOption.id, newEntry);

      if (priceCost && priceSale && priceCost > 0 && priceSale > 0) {
        addPriceHitory(
          identifier,
          productOption.priceCost,
          productOption.priceSale,
          priceCost,
          priceSale,
          supplier
        );
      }
      return updateEntry;
    } else {
      return { success: false, message: "Product not found" };
    }
  } else if (regexProduct.test(identifier)) {
    const product = PRODUCT_DB.getAll().find((product) => product.identifier === identifier);

    if (product) {
      let newEntry = data;

      if (data.stockQuantity) {
        const newQuantity = product.stockQuantity + data.stockQuantity;
        newEntry = { ...newEntry, stockQuantity: newQuantity };
      }

      const updateEntry = PRODUCT_DB.update(product.id, newEntry);

      if (priceCost && priceSale && priceCost > 0 && priceSale > 0) {
        addPriceHitory(
          identifier,
          product.priceCost,
          product.priceSale,
          priceCost,
          priceSale,
          supplier
        );
      }

      return updateEntry;
    } else {
      return { success: false, message: "Product not found" };
    }
  } else {
    return { success: false, message: "Identifier invalid" };
  }
};
