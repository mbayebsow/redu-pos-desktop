import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { DataBaseResponse, SupplierType } from "../utils/types";

import { SUPPLIERS_DB } from "../db/db";
import toast from "react-hot-toast";

interface DataContextProps {
  suppliers: SupplierType[] | [];
  addSupplier: (supplier: SupplierType) => void;
  getSupplierById: (supplierId: number) => DataBaseResponse<SupplierType>;
}

const SupplierContext = createContext<DataContextProps | undefined>(undefined);

const SupplierProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);

  const getSuppliers = () => {
    const data = SUPPLIERS_DB.getAll();
    setSuppliers(data);
  };

  const getSupplierById = (id: number) => {
    const supplier = SUPPLIERS_DB.getById(id);
    return supplier;
  };

  const addSupplier = (supplier: SupplierType) => {
    const saveSupplier = SUPPLIERS_DB.add(supplier);
    if (saveSupplier?.success) toast.success("Fournisseur ajouter avec succes");
    getSuppliers();
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return <SupplierContext.Provider value={{ suppliers, addSupplier, getSupplierById }}>{children}</SupplierContext.Provider>;
};

const useSupplier = (): DataContextProps => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier doit être utilisé à l'intérieur de SupplierProvider");
  }
  return context;
};

export { SupplierProvider, useSupplier };
