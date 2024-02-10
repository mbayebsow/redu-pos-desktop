import { useState } from "react";
import { formatISODate } from "../lib";
import { SalesType, TableColumns } from "../lib/types";

import { SaleProvider, useSale } from "../contexts/sale-context";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { ClientProvider, useClient } from "../contexts/client-context";

import SelectField from "../components/ui/select-field";
import Table from "../components/ui/data-table";

const ClientFullName = ({ record }: { record: SalesType }) => {
  const { getClientById } = useClient();

  return (
    record.customer && (
      <div>
        {getClientById(record.customer)?.data?.firstName} {getClientById(record.customer)?.data?.lastName}
      </div>
    )
  );
};

const salesListCulumns: TableColumns = [
  {
    title: "Produits",
    dataIndex: "itemsNumbers",
  },
  {
    title: "Montant total",
    dataIndex: "amount",
  },
  {
    title: "Montant reçu",
    dataIndex: "advance",
  },
  {
    title: "Client",
    dataIndex: "customer",
    render: (record: SalesType) => <ClientFullName record={record} />,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (record: SalesType) => <div>{formatISODate(record.date)}</div>,
  },
];

function SalesList({ setSaleSelected }: { setSaleSelected: (sale: SalesType) => void }) {
  const { clients } = useClient();
  const { sales } = useSale();

  const [filterByClientId, setFilterByClientId] = useState<number>(0);
  const [filterByDate, setFilterByDate] = useState<{ from: string; to: string }>({
    from: "0",
    to: "0",
  });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="py-2 flex gap-4 w-full bg-primary-50 rounded-xl p-2">
        <SelectField
          label="Client"
          name="client"
          value={filterByClientId.toString()}
          optionsData={clients}
          optionsText="firstName"
          optionsText2="lastName"
          optionsValue="id"
          defaultText="Tout"
          defaultTextValue="0"
          onChange={(e) => setFilterByClientId(Number(e.target.value))}
        />

        <div className="flex gap-2 items-center">
          <SelectField
            label="Du"
            name="from"
            value={filterByDate.from}
            optionsData={sales.map((sale) => sale.date)}
            defaultText="Tout"
            defaultTextValue="0"
            render={(date) => <div>{formatISODate(date, "date")}</div>}
            onChange={(e) => setFilterByDate((prev) => ({ ...prev, from: e.target.value }))}
          />

          <SelectField
            label="Au"
            name="to"
            value={filterByDate.to}
            optionsData={sales.map((sale) => sale.date)}
            defaultText="Tout"
            defaultTextValue="0"
            render={(date) => <div>{formatISODate(date, "date")}</div>}
            onChange={(e) => setFilterByDate((prev) => ({ ...prev, to: e.target.value }))}
          />
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll pr-2">
        <div className="h-fit w-full relative">
          {sales && (
            <Table
              data={sales
                .filter((sale) =>
                  filterByClientId === 0 ? sale : sale.customer === filterByClientId
                )
                .filter((sale) => {
                  const saleDate = new Date(sale.date);
                  const fromDate = new Date(filterByDate.from);

                  return filterByDate.from === "0" ? sale : saleDate >= fromDate;
                })
                .filter((sale) => {
                  const saleDate = new Date(sale.date);
                  const toDate = new Date(filterByDate.to);

                  return filterByDate.to === "0" ? sale : saleDate <= toDate;
                })}
              columns={salesListCulumns}
              handleClick={setSaleSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsSaleList({ saleSelected }: { saleSelected: SalesType | null }) {
  const { getSaleItems } = useSale();
  const { getproductById } = useProduct();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-xl font-bold border-b pb-5">Produits</div>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-full h-fit text-sm flex flex-col gap-2 py-2">
          {saleSelected &&
            getSaleItems(saleSelected.id).map((item, i) => (
              <div key={i} className="flex items-center gap-2 border-b pb-2 w-full">
                <img
                  className="aspect-square h-full w-12 rounded-lg"
                  src={getproductById(item.productId)?.data?.image}
                />
                <div className="hidden">{getproductById(item.productId)?.data?.identifier}</div>
                <div>
                  <div>{getproductById(item.productId)?.data?.name}</div>
                  <div>{getproductById(item.productId)?.data?.price}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function SalesScreen() {
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);

  return (
    <SaleProvider>
      <div className="flex gap-2 w-full h-full">
        <div className="w-full h-full">
          <ClientProvider>
            <SalesList setSaleSelected={setSaleSelected} />
          </ClientProvider>
        </div>

        <div className="w-96 h-full bg-primary-50 rounded-xl p-3">
          <ProductProvider>
            <ProductsSaleList saleSelected={saleSelected} />
          </ProductProvider>
        </div>
      </div>
    </SaleProvider>
  );
}

export default SalesScreen;
