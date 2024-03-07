import toast from "react-hot-toast";
import { STOCKITEMS_DB, STOCK_DB } from "../../db/db";
import { StockReplenishmentItemsType, StockReplenishmentType } from "../../utils/types";
import { updateProductAction } from "../product";
import { create } from "zustand";

interface DataContextProps {
  stocks: StockReplenishmentType[] | [];
  fetchStocks: () => void;
  addStock: (stockHead: StockReplenishmentType, stockItems: StockReplenishmentItemsType[], callBack?: () => void) => void;
}

export const fetchStocksAction = () => {
  const stocks = STOCK_DB.getAll();
  return stocks;
};

export const addStockAction = (stockHead: StockReplenishmentType, stockItems: StockReplenishmentItemsType[], callBack?: () => void) => {
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

      const updateEntry = updateProductAction(item.productIdentifier, {
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
    //   fetchStocks();
  }
};

const useStockStore = create<DataContextProps>((set, get) => ({
  stocks: fetchStocksAction(),
  fetchStocks: () => {
    const stocks = fetchStocksAction();
    set({ stocks });
  },
  addStock: (stockHead, stockItems) => {
    addStockAction(stockHead, stockItems);
    get().fetchStocks();
  },
}));

export default useStockStore;
