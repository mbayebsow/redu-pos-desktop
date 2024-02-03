import React, { createContext, useContext, ReactNode, useState } from "react";
import { CustomerType } from "../lib/types";
import useSound from "../hooks/useSound";

import { CUSTOMERS_DB } from "../lib/db";

interface DataContextProps {
  clients: CustomerType[];
  selectedClient: CustomerType | undefined;
  setSelectedClient: (client: CustomerType) => void;
  addClient: (client: CustomerType) => void;
}

const ClientContext = createContext<DataContextProps | undefined>(undefined);

const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedClient, setSelectedClient] = useState<CustomerType>();

  const { playBeep } = useSound();

  const addClient = (client: CustomerType) => {
    playBeep();
    console.log(client);
  };

  return (
    <ClientContext.Provider
      value={{ clients: CUSTOMERS_DB.getAll(), selectedClient, setSelectedClient, addClient }}
    >
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
