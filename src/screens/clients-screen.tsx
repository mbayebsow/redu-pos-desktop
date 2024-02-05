import { useState } from "react";
import { CustomerType, SalesType } from "../lib/types";

import Table from "../components/ui/data-table";
import TextField from "../components/ui/text-field";
import AddClient from "../components/client/client-add";

import { ClientProvider, useClient } from "../contexts/client-context";
import { SaleProvider, useSale } from "../contexts/sale-context";
import { formatISODate, numberWithCommas } from "../lib";

const clientsColumns = [
  {
    title: "Prenom",
    dataIndex: "firstName",
  },
  {
    title: "Nom",
    dataIndex: "lastName",
  },
  {
    title: "Telepohne",
    dataIndex: "phone",
  },
  {
    title: "Addresse",
    dataIndex: "address",
  },
];
const salesColumns = [
  {
    title: "N.P",
    dataIndex: "date",
    render: (record: SalesType) => <div className="whitespace-nowrap">{record.itemsNumbers}</div>,
  },
  {
    title: "Montant",
    dataIndex: "amount",
    render: (record: SalesType) => (
      <div className="whitespace-nowrap">
        <div>Total: {numberWithCommas(record.amount)}</div>
        <div>Reçu: {numberWithCommas(record.advance)}</div>
      </div>
    ),
  },
  {
    title: "Date et heure",
    dataIndex: "date",
    render: (record: SalesType) => (
      <div className=" whitespace-normal">{formatISODate(record.date)}</div>
    ),
  },
];

function ClientSales({ selectedClient }: { selectedClient: CustomerType | undefined }) {
  const { sales } = useSale();
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-xl font-bold border-b pb-5">Achats du client</div>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-fit h-fit text-sm">
          <Table
            data={sales.filter((sale) =>
              selectedClient ? sale.customer === selectedClient.id : null
            )}
            columns={salesColumns}
          />
        </div>
      </div>
    </div>
  );
}

function CLientsList({ setSelectedClient }: { setSelectedClient: (client: CustomerType) => void }) {
  const { clients } = useClient();
  const [filterByName, setFilterByName] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="py-2 flex justify-between gap-2 w-full bg-primary-50 rounded-xl p-2">
        <TextField
          label="Recherche"
          type="text"
          name="search"
          onChange={(e) => setFilterByName(e.target.value)}
        />
        <div className="flex gap-1">
          <AddClient />
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll  pr-2">
        <div className="h-fit w-full relative">
          {clients && (
            <Table
              handleClick={setSelectedClient}
              columns={clientsColumns}
              data={clients.filter(
                (client) =>
                  client.firstName.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()) ||
                  client.lastName.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase())
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ClientsScreen() {
  const [selectedClient, setSelectedClient] = useState<CustomerType>();

  return (
    <>
      <div className="flex gap-2 w-full h-full">
        <div className="w-2/3 h-full">
          <ClientProvider>
            <CLientsList setSelectedClient={setSelectedClient} />
          </ClientProvider>
        </div>

        <div className="w-1/3 h-full bg-primary-50 rounded-xl p-3">
          <SaleProvider>
            <ClientSales selectedClient={selectedClient} />
          </SaleProvider>
        </div>
      </div>
    </>
  );
}

export default ClientsScreen;
