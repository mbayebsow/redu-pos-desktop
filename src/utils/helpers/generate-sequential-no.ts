import { SALES_DB, STOCK_DB } from "../../db/db";

export function generateSequentialNo(type: "sales" | "stock" | "shipping") {
  const idLength = type === "sales" ? SALES_DB.getIdLength() : type === "stock" ? STOCK_DB.getIdLength() : 0;
  const receiptNo = `${type === "sales" ? "SA" : type === "stock" ? "ST" : type === "shipping" && "SH"}${10000000000 + (idLength + 1)}`;
  return receiptNo;
}
