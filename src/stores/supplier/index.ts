import toast from "react-hot-toast";
import { SUPPLIERS_DB } from "../../db/db";
import { DataBaseResponse, SupplierType } from "../../utils/types";
import { create } from "zustand";

interface DataContextProps {
  suppliers: SupplierType[] | [];
  addSupplier: (supplier: SupplierType) => void;
  getSupplierById: (supplierId: number) => DataBaseResponse<SupplierType>;
}

export const fetchSuppliersAction = () => {
  const suppliers = SUPPLIERS_DB.getAll();
  return suppliers;
};

export const getSupplierByIdAction = (id: number) => {
  const supplier = SUPPLIERS_DB.getById(id);
  return supplier;
};

export const addSupplierAction = (supplier: SupplierType) => {
  const saveSupplier = SUPPLIERS_DB.add(supplier);
  if (saveSupplier?.success) toast.success("Fournisseur ajouter avec succes");
  //   getSuppliers();
};

const useSupplierStore = create<DataContextProps>(() => ({
  suppliers: fetchSuppliersAction(),
  addSupplier: addSupplierAction,
  getSupplierById: getSupplierByIdAction,
}));

export default useSupplierStore;
