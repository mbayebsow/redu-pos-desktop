import { FC, ReactNode, createContext, useContext } from "react";
import { SalesType, SaleItemsType } from "../lib/types";
import { SALES_DB, SALEITEMS_DB } from "../lib/db";
import toast from "react-hot-toast/headless";

interface DataContextProps {
  sales: SalesType[];
  addSale: (sale: SalesType, saleItems: SaleItemsType[]) => void;
  getSaleItems: (saleId: number) => SaleItemsType[];
}

const SaleContext = createContext<DataContextProps | undefined>(undefined);

const SaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const addSale = (sale: SalesType, saleItems: SaleItemsType[]) => {
    const saveSale = SALES_DB.add(sale);

    if (saveSale?.data) {
      const saleId = saveSale.data.id;
      const itemsWithSaleid = saleItems.map((sale) => ({ ...sale, saleId }));
      const saveSaleItems = SALEITEMS_DB.addBatch(itemsWithSaleid);
      if (saveSaleItems?.success) toast.success("Vente enregistrer.");
    }
  };

  const getSaleItems = (saleId: number) => {
    const items = SALEITEMS_DB.getAll();
    const saleItems = items.filter((item) => item.saleId === saleId);
    return saleItems;
  };

  return (
    <SaleContext.Provider value={{ sales: SALES_DB.getAll(), addSale, getSaleItems }}>
      {children}
    </SaleContext.Provider>
  );
};

const useSale = (): DataContextProps => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useClient doit être utilisé à l'intérieur de ClientProvider");
  }
  return context;
};

export { SaleProvider, useSale };
