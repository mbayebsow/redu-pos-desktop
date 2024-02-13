import { ReactNode } from "react";

export type ProductType = {
  id: number;
  identifier: string; // Code bare
  name: string;
  priceCost: number; // Prix d'achat
  price: number; // Prix de vente null si des options sont disponible
  stockQuantity: number;
  supplier: string; // Fournisseur
  category: number | null;
  isActive: boolean;
  unit: string; // Type d'unité
  type: "standard" | "variable";
  image: string;
};

export type ProductOptionType = {
  id: number;
  ProductID: number;
  name: string;
  priceCost: number; // Prix d'achat
  priceSale: number; // Prix de vente
  stockQuantity: number;
};

export type ProductsWithOptionsType = ProductType & {
  options?: ProductOptionType[];
};

export type CategoryType = {
  id: number;
  name: string;
  color?: string;
  isActive: boolean;
};

export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  mail?: string;
  isActive: boolean;
};

export type SalesType = {
  id: number;
  date: Date;
  amount: number;
  discount: number;
  advance: number;
  itemsNumbers: number;
  customer?: number | null;
};

export type SaleItemsType = {
  id: number;
  saleId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type StockTransactionsType = {
  id: number;
  productId: number;
  transactionType: "in" | "out";
  quantity: number;
  date: Date;
};

export type CartType = Required<ProductType> & {
  quantity: number;
};

export type TableColumns = {
  title: string;
  dataIndex?: string;
  width?: number;
  render?: (record?: any) => ReactNode;
}[];

export type DataBaseResponse<T> = { success: boolean; message?: string; data?: T };
