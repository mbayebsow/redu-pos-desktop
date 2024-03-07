import { useEffect, useState } from "react";
import { CustomerType, SalesType } from "../utils/types";
import { formatISODate, numberWithCommas } from "../utils";

import useSaleStore from "../stores/sale";
import useUserStore from "../stores/users";

import SectionTitle from "../components/ui/section-title";
import Table from "../components/ui/data-table";
import TextField from "../components/ui/text-field";
import AddClient from "../components/client/client-add";
import { clientsColumns } from "../components/client/client-page-culumns";
import Statistic from "../components/ui/statistic";
import useTheme from "../stores/theme";

const salesColumns = [
  {
    title: "N.P",
    dataIndex: "date",
    render: (record: SalesType) => <div className="whitespace-nowrap">{record.itemsNumbers}</div>,
  },
  {
    title: "Montant",
    dataIndex: "amount",
    render: (record: SalesType) => <div className="whitespace-nowrap">{numberWithCommas(record.amount)}</div>,
  },
  {
    title: "Status",
    dataIndex: "advance",
    render(record: SalesType) {
      return (
        <div className="flex items-center gap-2">
          <div
            className={`${record.amount - record.advance > 0 ? "bg-red-500" : record.amount - record.advance <= 0 && "bg-green-500"} rounded-full w-3 h-3`}
          />
          <div>{record.amount - record.advance > 0 ? "Partiel" : record.amount - record.advance <= 0 && "Complet"}</div>
        </div>
      );
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (record: SalesType) => <div className="whitespace-nowrap">{formatISODate(record.date, "date")}</div>,
  },
];

function ClientSales({ selectedClient }: { selectedClient: CustomerType | undefined }) {
  const { activeTheme } = useTheme();
  const sales = useSaleStore((state) => state.sales.filter((sale) => (selectedClient ? sale.customer === selectedClient.id : null)));
  const fetchSales = useSaleStore((state) => state.fetchSales);

  const amountSum = sales.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  const advanceSum = sales.reduce((accumulator, object) => {
    if (object.amount > object.advance) {
      return accumulator + (object.amount - object.advance);
    } else {
      return accumulator;
    }
  }, 0);

  useEffect(() => fetchSales(), [selectedClient]);

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
      <div className="w-full h-fit flex flex-col">
        <SectionTitle>Achats</SectionTitle>
        <div style={{ backgroundColor: activeTheme[50] }} className="w-full h-fit divide-y divide-black/10 rounded-lg">
          <Statistic title="Total achat" value={amountSum} />
          <Statistic title="Total dû" value={advanceSum} styleValue="text-red-500" />
        </div>
      </div>

      <div className="w-full h-full flex flex-col overflow-hidden">
        <SectionTitle>Historiques</SectionTitle>
        <div style={{ backgroundColor: activeTheme[50] }} className="w-full h-full overflow-y-scroll rounded-lg">
          <div className="w-full h-fit relative">
            <Table data={sales} columns={salesColumns} />
          </div>
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

      <div className="w-full h-full overflow-y-scroll rounded-lg">
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
    <div className="flex gap-2 w-full h-full">
      <div className="w-full h-full">
        <CLientsList setSelectedClient={setSelectedClient} />
      </div>

      <div className="w-[30rem] h-full">
        <ClientSales selectedClient={selectedClient} />
      </div>
    </div>
  );
}

export default ClientsPage;
