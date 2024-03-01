import toast from "react-hot-toast";
import { SALEITEMS_DB, SALES_DB } from "../../db/db";
import { CartType, SaleDetails, SaleItemsType, SalesType } from "../../utils/types";
import { create } from "zustand";
import { getproductByIdentifierAction } from "../product";
import { convertProductToCartType } from "../cart";

interface DataContextProps {
  sales: SalesType[];
  fetchSales: () => void;
  addSale: (sale: SalesType, saleItems: SaleItemsType[]) => void;
  getSaleItemsBySaleId: (saleId: number) => SaleItemsType[];
}

export const getSalesAction = () => {
  const sales = SALES_DB.getAll();
  return sales;
};

export const addSaleAction = (sale: SalesType, saleItems: SaleItemsType[]) => {
  const saveSale = SALES_DB.add(sale);

  if (saveSale?.data) {
    const saleId = saveSale.data.id;
    const itemsWithSaleid = saleItems.map((sale) => ({ ...sale, saleId }));
    const saveSaleItems = SALEITEMS_DB.addBatch(itemsWithSaleid);
    if (saveSaleItems?.success) toast.success("Vente enregistrer.");
  }
};

export const getSaleItemsBySaleIdAction = (saleId: number) => {
  const items = SALEITEMS_DB.getAll();
  const saleItems = items.filter((item) => item.saleId === saleId);
  return saleItems;
};

export const getSaleDatailsAction = (saleId: number): SaleDetails | null => {
  let products: CartType[] = [];
  const sale = SALES_DB.getById(saleId);

  if (sale.success && sale.data) {
    const saleItems = getSaleItemsBySaleIdAction(saleId);

    const items = saleItems.map((item) => getproductByIdentifierAction(item.identifier));
    items.map((product) => product && products.push(convertProductToCartType(product)));

    return { ...sale.data, saleItems: products };
  } else {
    toast.error("Une erreur est survenue lors de la récupération des données de la vente.");
    return null;
  }
};

const useSaleStore = create<DataContextProps>((set) => ({
  sales: getSalesAction(),
  addSale: addSaleAction,
  getSaleItemsBySaleId: getSaleItemsBySaleIdAction,
  fetchSales: () => {
    const sales = getSalesAction();
    set({ sales });
  },
}));

export default useSaleStore;
