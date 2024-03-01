import { useEffect, useState } from "react";
import { formatISODate } from "../utils";
import { SaleDetails, SalesType } from "../utils/types";

import useUserStore from "../stores/users";
import useSaleStore, { getSaleDatailsAction } from "../stores/sale";
import useProductStore from "../stores/product";

import SelectField from "../components/ui/select-field";
import Table from "../components/ui/data-table";
import SectionTitle from "../components/ui/section-title";
import { salePageCulumns } from "../components/sale/sale-page-culumns";
import Receipt from "../components/ui/receipt";
import Button from "../components/ui/button";
import { Printer, Send } from "lucide-react";

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
              columns={salePageCulumns}
              handleClick={setSaleSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ReceiptSection({ saleSelected }: { saleSelected: SalesType | null }) {
  const [saleDetails, setSaleDetails] = useState<SaleDetails | null>(null);

  useEffect(() => {
    if (saleSelected) {
      const details = getSaleDatailsAction(saleSelected?.id);
      setSaleDetails(details);
    }
  }, [saleSelected]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full overflow-y-scroll">
        {saleDetails && (
          <Receipt
            receiptRef={null}
            totalPrice={saleDetails.amount}
            deposit={saleDetails.advance}
            receiptNo={saleDetails.id.toString()}
            clientId={saleDetails.customer}
            products={saleDetails.saleItems}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        <Button separator variant="tonal" icon={<Send />}>
          Envoyer
        </Button>
        <Button separator icon={<Printer />}>
          Imprimer
        </Button>
      </div>
    </div>
  );
}

function ProductsSaleList({ saleSelected }: { saleSelected: SalesType | null }) {
  const getSaleItemsBySaleId = useSaleStore((state) => state.getSaleItemsBySaleId);
  const getproductByIdentifierAction = useProductStore((state) => state.getproductByIdentifier);

  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle>Produits</SectionTitle>
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-full h-fit text-sm flex flex-col gap-2 py-2">
          {saleSelected &&
            getSaleItemsBySaleId(saleSelected.id).map((item, i) => (
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

// <ProductsSaleList saleSelected={saleSelected} />

function SalesPage() {
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);

  return (
    <div className="flex gap-2 w-full h-full">
      <div className="w-2/3 h-full bg-white/60 border border-primary-100/50 p-2 rounded-xl">
        <SalesList setSaleSelected={setSaleSelected} />
      </div>

      <div className="w-1/3 h-full bg-white/60 border border-primary-100/50 p-2 rounded-xl">
        <ReceiptSection saleSelected={saleSelected} />
      </div>
    </div>
  );
}

export default SalesPage;
