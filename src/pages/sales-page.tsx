import { useEffect, useRef, useState } from "react";
import { formatISODate } from "../utils";
import { SaleDetails, SalesType } from "../utils/types";

import useUserStore from "../stores/users";
import useSaleStore, { getSaleDatailsAction } from "../stores/sale";

import SelectField from "../components/ui/select-field";
import Table from "../components/ui/data-table";
import SectionTitle from "../components/ui/section-title";
import { salePageCulumns } from "../components/sale/sale-page-culumns";
import Receipt from "../components/ui/receipt";
import Button from "../components/ui/button";
import { Printer, ReceiptText, Send } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import TextField from "../components/ui/text-field";
import useTheme from "../stores/theme";

function SalesList({ setSaleSelected }: { setSaleSelected: (sale: SalesType) => void }) {
  const users = useUserStore((state) => state.users);
  const sales = useSaleStore((state) => state.sales);
  const fetchSales = useSaleStore((state) => state.fetchSales);

  const [filterByClientId, setFilterByClientId] = useState<number>(0);
  const [filterByReceiptNo, setFilterByReceiptNo] = useState("");
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
          <div>
            <TextField
              type="text"
              label="No "
              name="searchNo"
              value={filterByReceiptNo}
              onChange={(e) => setFilterByReceiptNo(e.target.value)}
              clrearValue={() => setFilterByReceiptNo("")}
            />
          </div>
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

          <div className="flex gap-0 items-center">
            <SelectField
              label="Du"
              name="from"
              value={filterByDate.from}
              optionsData={sales.map((sale) => sale.date)}
              defaultText="Tout"
              defaultTextValue="0"
              render={(date) => formatISODate(date, "date")}
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
              render={(date) => formatISODate(date, "date")}
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

      <div className="w-full h-full overflow-y-scroll rounded-lg">
        <div className="h-fit w-full relative">
          {sales && (
            <Table
              data={sales
                .filter((sale) => (sale?.receiptNo ? sale.receiptNo.toLocaleLowerCase().includes(filterByReceiptNo.toLocaleLowerCase()) : sale))
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
  const { activeTheme } = useTheme();
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const [saleDetails, setSaleDetails] = useState<SaleDetails | null>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    // onBeforePrint: () => null,
    // onAfterPrint: () => null,
    onPrintError: () => alert("Erreur d'impression."),
  });

  useEffect(() => {
    if (saleSelected) {
      const details = getSaleDatailsAction(saleSelected?.id);
      setSaleDetails(details);
    }
  }, [saleSelected]);

  return saleDetails ? (
    <div className="w-full h-full flex flex-col p-2 gap-2">
      <div className="w-full h-full overflow-y-scroll rounded-lg">
        <Receipt
          receiptRef={receiptRef}
          totalPrice={saleDetails.amount}
          deposit={saleDetails.advance}
          receiptNo={saleDetails.receiptNo}
          clientId={saleDetails.customer}
          products={saleDetails.saleItems}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Button separator icon={<Send />}>
          Envoyer
        </Button>
        <Button separator icon={<Printer />} handleClick={() => handlePrint()}>
          Imprimer
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ReceiptText size={200} color={activeTheme[100]} />
    </div>
  );
}

function SalesPage() {
  const { activeTheme } = useTheme();
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);

  return (
    <div className="flex gap-2 w-full h-full">
      <div className="w-2/3 h-full rounded-xl">
        <SalesList setSaleSelected={setSaleSelected} />
      </div>

      <div style={{ backgroundColor: activeTheme[50] }} className="w-1/3 h-full rounded-xl">
        <ReceiptSection saleSelected={saleSelected} />
      </div>
    </div>
  );
}

export default SalesPage;
