import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { StockReplenishmentItemsType, StockReplenishmentType } from "../lib/types";
import { STOCKITEMS_DB, STOCK_DB } from "../lib/db";
import { updateProduct } from "../services/prodcut-services";
import toast from "react-hot-toast";

interface DataContextProps {
  stocks: StockReplenishmentType[] | [];
  addStock: (stockHead: StockReplenishmentType, stockItems: StockReplenishmentItemsType[], callBack?: () => void) => void;
}

const StockContext = createContext<DataContextProps | undefined>(undefined);

const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<StockReplenishmentType[] | []>([]);

  const fetchStocks = () => {
    const st = STOCK_DB.getAll();
    setStocks(st);
  };

  const addStock = (stockHead: StockReplenishmentType, stockItems: StockReplenishmentItemsType[], callBack?: () => void) => {
    const stock = STOCK_DB.add(stockHead);
    if (stock.success && stock.data) {
      const stockId = stock.data.id;
      const stockItemsWithId = stockItems.map((item) => ({ ...item, stockId }));

      const stockItemsDB = STOCKITEMS_DB.addBatch(stockItemsWithId);

      if (!stockItemsDB.success && stockItemsDB.message) {
        toast.error(stockItemsDB.message);
        return;
      }

      stockItems.map((item) => {
        let newPrice: { priceCost?: number; priceSale?: number } = {};

        if (item.priceCost > 0) newPrice.priceCost = item.priceCost;
        if (item.priceSale > 0) newPrice.priceSale = item.priceSale;

        const updateEntry = updateProduct(item.productIdentifier, {
          ...newPrice,
          stockQuantity: item.newQuantity,
          supplier: stockHead.supplier,
        });

        if (!updateEntry.success && updateEntry.message) {
          toast.error(updateEntry.message);
          return;
        }
      });

      toast.success("Stock ajouter.");
      callBack && callBack();
      fetchStocks();
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return <StockContext.Provider value={{ stocks, addStock }}>{children}</StockContext.Provider>;
};

const useStock = (): DataContextProps => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock doit être utilisé à l'intérieur de SupplierProvider");
  }
  return context;
};

export { StockProvider, useStock };
