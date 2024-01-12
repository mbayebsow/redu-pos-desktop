export type ProductType = {
  id?: number;
  name: string;
  price: number;
  priceDemi: boolean;
  unite: string;
  isActive: boolean;
  image: string;
};

export type CartType = Required<ProductType> & {
  qty: number;
};

export type ClientType = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  date: string;
};
