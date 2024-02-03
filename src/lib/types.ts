export type ProductType = {
  id?: number;
  identifier: number;
  name: string;
  price: number;
  stockQuantity: number;
  supplier: string;
  category: number;
  isActive: boolean;
  image: string;
};

export type CategoryType = {
  id?: number;
  name: string;
  color?: string;
  isActive: boolean;
};

export type CustomerType = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  mail?: string;
  isActive: boolean;
};

export type SalesType = {
  id?: number;
  date: Date;
  amount: number;
  discount: number;
  advance: number;
  customer?: number;
};

export type SaleItemsType = {
  id?: number;
  saleId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type StockTransactionsType = {
  id?: number;
  productId: number;
  transactionType: "in" | "out";
  quantity: number;
  date: Date;
};

export type CartType = Required<ProductType> & {
  quantity: number;
};
