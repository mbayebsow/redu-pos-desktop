import { PRICEHISTORY_DB } from "../../db/db";
import { DataBaseResponse, PriceHistoryType } from "../../utils/types";

export const addPriceHitoryAction = (
  identifier: string,
  oldPriceCost: number,
  oldPriceSale: number,
  newPriceCost: number,
  newPriceSale: number,
  supplier: number | null | undefined
) => {
  const newHitory = {
    id: 0,
    productIdentifier: identifier,
    oldPriceCost,
    oldPriceSale,
    newPriceCost,
    newPriceSale,
    supplier: supplier || null,
    date: new Date(),
  };

  const newEntry: DataBaseResponse<PriceHistoryType> = PRICEHISTORY_DB.add(newHitory);
  return newEntry;
};
