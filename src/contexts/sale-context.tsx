import { FC, ReactNode, createContext, useContext } from "react";
import { SalesType, SaleItemsType } from "../lib/types";
import { SALES_DB, SALEITEMS_DB } from "../lib/db";
import toast from "react-hot-toast/headless";

interface DataContextProps {
  sales: SalesType[];
  addSale: (sale: SalesType, saleItems: SaleItemsType[]) => void;
}

const SaleContext = createContext<DataContextProps | undefined>(undefined);

const SaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const addSale = (sale: SalesType, saleItems: SaleItemsType[]) => {
    const saveSale = SALES_DB.add(sale);

    if (saveSale?.success) {
      const itemsWithSaleid = saleItems.map((sale) => ({ ...sale, saleId: saveSale.id }));
      const saveSaleItems = SALEITEMS_DB.addBatch(itemsWithSaleid);
      if (saveSaleItems?.success) toast.success("Vente enregistrer.");
    }
  };

  return (
    <SaleContext.Provider value={{ sales: SALES_DB.getAll(), addSale }}>
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
