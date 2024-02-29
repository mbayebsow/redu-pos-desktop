import { useState } from "react";
import { CustomerType, SalesType } from "../utils/types";
import { formatISODate, numberWithCommas } from "../utils";

import useSaleStore from "../stores/sale";
import useUserStore from "../stores/users";

import SectionTitle from "../components/ui/section-title";
import Table from "../components/ui/data-table";
import TextField from "../components/ui/text-field";
import AddClient from "../components/client/client-add";

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
    render: (record: SalesType) => <div className=" whitespace-normal">{formatISODate(record.date)}</div>,
  },
];

function ClientSales({ selectedClient }: { selectedClient: CustomerType | undefined }) {
  const sales = useSaleStore((state) => state.sales);

  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle>Achats</SectionTitle>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-fit h-fit text-sm">
          <Table data={sales.filter((sale) => (selectedClient ? sale.customer === selectedClient.id : null))} columns={salesColumns} />
        </div>
      </div>
    </div>
  );
}

function CLientsList({ setSelectedClient }: { setSelectedClient: (client: CustomerType) => void }) {
  const users = useUserStore((state) => state.users);

  const [filterByName, setFilterByName] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <SectionTitle>Clients</SectionTitle>
      <div className="flex justify-between gap-2 w-full">
        <TextField label="Recherche" type="text" name="search" onChange={(e) => setFilterByName(e.target.value)} />
        <div className="flex gap-1">
          <AddClient />
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll  pr-2">
        <div className="h-fit w-full relative">
          {users && (
            <Table
              handleClick={setSelectedClient}
              columns={clientsColumns}
              data={users.filter(
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

function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<CustomerType>();

  return (
    <>
      <div className="flex gap-2 w-full h-full">
        <div className="w-full h-full bg-white/60 p-2 rounded-xl">
          <CLientsList setSelectedClient={setSelectedClient} />
        </div>

        <div className="w-96 h-full bg-white/60 p-2 rounded-xl">
          <ClientSales selectedClient={selectedClient} />
        </div>
      </div>
    </>
  );
}

export default ClientsPage;
