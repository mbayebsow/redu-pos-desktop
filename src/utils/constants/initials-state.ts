import { ProductOptionType, ProductType } from "../types";

export const INITIAL_CATEGORY = {
  id: 0,
  name: "",
  color: "#1e8275",
  isActive: true,
};

export const INITIAL_PRODUCT: ProductType = {
  id: 0,
  unit: "Piece",
  name: "",
  supplier: null,
  type: "standard",
  priceCost: 0,
  priceSale: 0,
  identifier: "",
  stockQuantity: 0,
  category: 0,
  isActive: true,
  image: "http://dummyimage.com/100x100.png",
};

export const INITIAL_PRODUCT_OPTIONS: ProductOptionType = {
  id: 0,
  identifier: "",
  ProductID: 0,
  name: "",
  priceCost: 0,
  priceSale: 0,
  supplier: null,
  stockQuantity: 0,
};
