import React, { createContext, useContext, ReactNode } from "react";
import { ClientType } from "../types";
import useSound from "../hooks/useSound";

import clientsMock from "../mockdata/clients.json";

interface DataContextProps {
  clients: ClientType[];
  addClient: (client: ClientType) => void;
}

const ClientContext = createContext<DataContextProps | undefined>(undefined);

const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //   const [client, setClient] = useState<Array<ClientType>>(clientsMock);

  const { playBeep } = useSound();

  const addClient = (client: ClientType) => {
    playBeep();
    console.log(client);

    // const existIndex = ClientProducts.findIndex((p) => p.id === product.id);

    // if (existIndex === -1) {
    //   setClientProduct((prevData) => prevData.concat({ ...product, qty: 1 }));
    // } else {
    //   ClientProducts[existIndex].qty++;
    //   setClientProduct([...ClientProducts]);
    // }
  };

  return <ClientContext.Provider value={{ clients: clientsMock, addClient }}>{children}</ClientContext.Provider>;
};

const useClient = (): DataContextProps => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient doit être utilisé à l'intérieur de ClientProvider");
  }
  return context;
};

export { ClientProvider, useClient };
