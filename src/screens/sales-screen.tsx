import { useState } from "react";
import { formatISODate } from "../lib";
import { SalesType, TableColumns } from "../lib/types";

import { SaleProvider, useSale } from "../contexts/sale-context";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { ClientProvider, useClient } from "../contexts/client-context";

import SelectField from "../components/ui/select-field";
import Table from "../components/ui/data-table";

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
    render: (record: SalesType) => {
      const { getClientById } = useClient();
      return (
        record.customer && (
          <div>
            <div>{getClientById(record.customer)?.firstName}</div>
            <div>{getClientById(record.customer)?.lastName}</div>
          </div>
        )
      );
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (record: SalesType) => <div>{formatISODate(record.date)}</div>,
  },
];

function SalesList({ setSaleSelected }: { setSaleSelected: (sale: SalesType) => void }) {
  const [filterByClientId, setFilterByClientId] = useState<number>(0);
  const { clients } = useClient();
  const { sales } = useSale();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="py-2 flex gap-2 w-full bg-primary-50 rounded-xl p-2">
        <SelectField
          label="Client"
          name="client"
          value={filterByClientId.toString()}
          optionsData={clients}
          optionsText="firstName"
          optionsValue="id"
          defaultText="Tout"
          defaultTextValue="0"
          onChange={(e) => setFilterByClientId(Number(e.target.value))}
        />
        <SelectField
          label="Client"
          name="client"
          value={filterByClientId.toString()}
          optionsData={clients}
          optionsText="firstName"
          optionsValue="id"
          defaultText="Tout"
          defaultTextValue="0"
          onChange={(e) => setFilterByClientId(Number(e.target.value))}
        />
      </div>

      <div className="w-full h-full overflow-y-scroll pr-2">
        <div className="h-fit w-full relative">
          {sales && (
            <Table
              data={sales.filter((sale) =>
                filterByClientId === 0 ? sale : sale.customer === filterByClientId
              )}
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
                  src={getproductById(item.productId)?.image}
                />
                <div className="hidden">{getproductById(item.productId)?.identifier}</div>
                <div>
                  <div>{getproductById(item.productId)?.name}</div>
                  <div>{getproductById(item.productId)?.price}</div>
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
