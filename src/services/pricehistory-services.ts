import { PRICEHISTORY_DB } from "../lib/db";
import { DataBaseResponse, PriceHistoryType } from "../lib/types";

/**
 * Adds a new price history entry to the database.
 *
 * @param {string} identifier - The identifier of the product
 * @param {number} oldPriceCost - The old cost price
 * @param {number} oldPriceSale - The old sale price
 * @param {number} newPriceCost - The new cost price
 * @param {number} newPriceSale - The new sale price
 * @param {number | null} supplier - The supplier ID or null if not applicable
 * @return {DataBaseResponse<PriceHistoryType>} The newly added price history entry
 */
export const addPriceHitory = (
  identifier: string,
  oldPriceCost: number,
  oldPriceSale: number,
  newPriceCost: number,
  newPriceSale: number,
  supplier: number | null
) => {
  const newHitory = {
    id: 0,
    productIdentifier: identifier,
    oldPriceCost,
    oldPriceSale,
    newPriceCost,
    newPriceSale,
    supplier,
    date: new Date(),
  };

  const newEntry: DataBaseResponse<PriceHistoryType> = PRICEHISTORY_DB.add(newHitory);
  return newEntry;
};
