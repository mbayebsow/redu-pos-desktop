import { useEffect, useState } from "react";
import { formatISODate } from "../utils";
import { SalesType } from "../utils/types";

import useUserStore from "../stores/users";
import useSaleStore from "../stores/sale";
import useProductStore from "../stores/product";

import SelectField from "../components/ui/select-field";
import Table from "../components/ui/data-table";
import SectionTitle from "../components/ui/section-title";
import { salesListCulumns } from "../components/shared/table-columns/sale-screen-culumns";

function SalesList({ setSaleSelected }: { setSaleSelected: (sale: SalesType) => void }) {
  const users = useUserStore((state) => state.users);
  const sales = useSaleStore((state) => state.sales);
  const fetchSales = useSaleStore((state) => state.fetchSales);

  const [filterByClientId, setFilterByClientId] = useState<number>(0);
  const [filterByDate, setFilterByDate] = useState<{
    from: string;
    to: string;
  }>({
    from: "0",
    to: "0",
  });

  useEffect(() => fetchSales(), []);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full">
        <SectionTitle>Ventes</SectionTitle>
        <div className="w-full flex gap-4">
          <div className="w-60">
            <SelectField
              label="Client"
              name="client"
              value={filterByClientId.toString()}
              optionsData={users}
              optionsText="firstName"
              optionsText2="lastName"
              optionsValue="id"
              defaultText="Tout"
              defaultTextValue="0"
              onChange={(e) => setFilterByClientId(Number(e.target.value))}
            />
          </div>

          <div className="flex gap-2 items-center">
            <SelectField
              label="Du"
              name="from"
              value={filterByDate.from}
              optionsData={sales.map((sale) => sale.date)}
              defaultText="Tout"
              defaultTextValue="0"
              render={(date) => <div>{formatISODate(date, "date")}</div>}
              onChange={(e) =>
                setFilterByDate((prev) => ({
                  ...prev,
                  from: e.target.value,
                }))
              }
            />

            <SelectField
              label="Au"
              name="to"
              value={filterByDate.to}
              optionsData={sales.map((sale) => sale.date)}
              defaultText="Tout"
              defaultTextValue="0"
              render={(date) => <div>{formatISODate(date, "date")}</div>}
              onChange={(e) =>
                setFilterByDate((prev) => ({
                  ...prev,
                  to: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll rounded-lg bg-primary-50">
        <div className="h-fit w-full relative">
          {sales && (
            <Table
              data={sales
                .filter((sale) => (filterByClientId === 0 ? sale : sale.customer === filterByClientId))
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
  const getSaleById = useSaleStore((state) => state.getSaleById);
  const getproductByIdentifierAction = useProductStore((state) => state.getproductByIdentifier);

  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle>Produits</SectionTitle>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-full h-fit text-sm flex flex-col gap-2 py-2">
          {saleSelected &&
            getSaleById(saleSelected.id).map((item, i) => (
              <div key={i} className="flex items-center gap-2 border-b border-gray-100 pb-2 w-full">
                <img className="aspect-square h-full w-12 rounded-lg" src={getproductByIdentifierAction(item.identifier)?.image} />
                <div className="hidden">{item.identifier}</div>
                <div>
                  <div>
                    <div>{getproductByIdentifierAction(item.identifier)?.name}</div>
                  </div>
                  <div className="text-xs">
                    {getproductByIdentifierAction(item.identifier)?.priceSale} x {item.quantity}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function SalesPage() {
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);

  return (
    <div className="flex gap-2 w-full h-full">
      <div className="w-full h-full bg-white/60 border border-primary-100/50 p-2 rounded-xl">
        <SalesList setSaleSelected={setSaleSelected} />
      </div>

      <div className="w-96 h-full bg-white/60 border border-primary-100/50 p-2 rounded-xl">
        <ProductsSaleList saleSelected={saleSelected} />
      </div>
    </div>
  );
}

export default SalesPage;
