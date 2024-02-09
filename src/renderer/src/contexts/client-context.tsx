import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { CustomerType } from "../lib/types";

import { CUSTOMERS_DB } from "../lib/db";
import toast from "react-hot-toast";

interface DataContextProps {
  clients: CustomerType[] | [];
  addClient: (client: CustomerType) => void;
  getClientById: (clientId: number) => CustomerType | undefined;
}

const ClientContext = createContext<DataContextProps | undefined>(undefined);

const ClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<CustomerType[]>([]);

  const getClients = () => {
    const data = CUSTOMERS_DB.getAll();
    setClients(data);
  };

  const getClientById = (id: number) => {
    const client = CUSTOMERS_DB.getById(id);
    return client;
  };

  const addClient = (client: CustomerType) => {
    const saveClient = CUSTOMERS_DB.add(client);
    if (saveClient?.success) toast.success("Client ajouter avec succes");
    getClients();
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, addClient, getClientById }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClient = (): DataContextProps => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient doit être utilisé à l'intérieur de ClientProvider");
  }
  return context;
};

export { ClientProvider, useClient };
