import { SUPPLIERS_DB } from "../lib/db";
import { SupplierType } from "../lib/types";

export const getSuppliers = () => {
  const data = SUPPLIERS_DB.getAll();
  return data;
};

export const getSupplierById = (id: number) => {
  const supplier = SUPPLIERS_DB.getById(id);
  return supplier;
};

export const addSupplier = (supplier: SupplierType) => {
  const saveSupplier = SUPPLIERS_DB.add(supplier);
  return saveSupplier;
};
