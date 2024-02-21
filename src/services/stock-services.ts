import toast from "react-hot-toast";
import { STOCKITEMS_DB, STOCK_DB } from "../lib/db";
import { StockReplenishmentItemsType, StockReplenishmentType } from "../lib/types";
import { updateProduct } from "./prodcut-services";

export const getStocks = () => {
  const data = STOCK_DB.getAll();
  return data;
};

export const addStock = (
  stockHead: StockReplenishmentType,
  stockItems: StockReplenishmentItemsType[],
  callBack?: () => void
) => {
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

      if (item.priceCost > 0) newPrice = { priceCost: item.priceCost };
      if (item.priceSale > 0) newPrice = { priceSale: item.priceSale };
      if (item.priceCost > 0 && item.priceSale > 0)
        newPrice = { priceCost: item.priceCost, priceSale: item.priceSale };

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
  }
};
