import toast from "react-hot-toast";
import { SALEITEMS_DB, SALES_DB } from "../../db/db";
import { SaleItemsType, SalesType } from "../../utils/types";
import { create } from "zustand";

interface DataContextProps {
  sales: SalesType[];
  fetchSales: () => void;
  addSale: (sale: SalesType, saleItems: SaleItemsType[]) => void;
  getSaleById: (saleId: number) => SaleItemsType[];
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

export const getSaleByIdAction = (saleId: number) => {
  const items = SALEITEMS_DB.getAll();
  const saleItems = items.filter((item) => item.saleId === saleId);
  return saleItems;
};

const useSaleStore = create<DataContextProps>((set) => ({
  sales: getSalesAction(),
  addSale: addSaleAction,
  getSaleById: getSaleByIdAction,
  fetchSales: () => {
    const sales = getSalesAction();
    set({ sales });
  },
}));

export default useSaleStore;
