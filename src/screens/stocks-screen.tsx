import { Eye, Pen, Plus, Trash } from "lucide-react";
import Button from "../components/ui/button";
import SectionTitle from "../components/ui/section-title";
// import SelectField from "../components/ui/select-field";
import TextField from "../components/ui/text-field";
import Modal from "../components/ui/modal";
import { useState } from "react";
import { StockReplenishmentType, SupplierType, TableColumns } from "../lib/types";
import { SupplierProvider, useSupplier } from "../contexts/supplier-context";
import SupplierAdd from "../components/supplier/supplier-add";
import StockAdd from "../components/stock/stock-add";
import { ProductProvider } from "../contexts/product-context";
import { StockProvider, useStock } from "../contexts/stock-context";
import Drawer from "../components/ui/drawer";
import Table from "../components/ui/data-table";
import { formatISODate, numberWithCommas } from "../lib";
import { getSupplierById } from "../services/supplier-services";

const INITIAL_SUPPLIER = {
  id: 0,
  name: "",
  address: "",
  phone: 7,
  isActive: true,
};

const stockColumns: TableColumns = [
  {
    title: "Date",
    dataIndex: "date",
    render(record) {
      return formatISODate(record.date);
    },
  },
  {
    title: "Fournisseur",
    dataIndex: "supplier",
    render(record: StockReplenishmentType) {
      return <div>{record.supplier && getSupplierById(record.supplier).data?.name}</div>;
    },
  },
  {
    title: "N Produit",
    render(record) {
      return <div>20</div>;
    },
  },
  {
    title: "Total Commande",
    render(record) {
      return numberWithCommas(record.totalAmountOrder);
    },
  },
  {
    title: "Total payé",
    render(record) {
      return numberWithCommas(record.payAmount);
    },
  },
  {
    title: "Etat",
    dataIndex: "status",
  },
  {
    title: "Options",
    render(record) {
      return (
        <div className="flex items-center gap-0">
          <Button variant="icon" icon={<Eye />} />
          <Button variant="icon" icon={<Pen />} />
          <Button variant="icon" icon={<Trash color="red" />} />
        </div>
      );
    },
  },
];
function StocksSection() {
  const { stocks } = useStock();
  // const [supplierSearchName, setSupplierSearchName] = useState("");

  return (
    <>
      <div className="h-full w-full flex flex-col">
        <SectionTitle>Stocks</SectionTitle>
        <div className="flex justify-between items-center w-full">
          {/*
          <div className="flex items-center gap-2 w-2/3">
            <SelectField
              label="Type"
              name="to"
              value={1}
              optionsData={[1, 2, 3, 4, 5, 6, 7, 8]}
              defaultText="Tout"
              defaultTextValue="0"
              // render={(date) => <div>{formatISODate(date, "date")}</div>}
              // onChange={(e) =>
              //   setFilterByDate((prev) => ({
              //     ...prev,
              //     to: e.target.value,
              //   }))
              // }
            />

            <SelectField
              label="Entrepôt"
              name="warehouse"
              value={1}
              optionsData={[1, 2, 3, 4, 5, 6, 7, 8]}
              optionsText="firstName"
              optionsText2="lastName"
              optionsValue="id"
              defaultText="Tout"
              defaultTextValue="0"
              // onChange={(e) => setFilterByClientId(Number(e.target.value))}
            />

            <SelectField
              label="Du"
              name="from"
              value={1}
              optionsData={[1, 2, 3, 4, 5, 6, 7, 8]}
              defaultText="Tout"
              defaultTextValue="0"
              // render={(date) => <div>{formatISODate(date, "date")}</div>}
              // onChange={(e) =>
              //   setFilterByDate((prev) => ({
              //     ...prev,
              //     from: e.target.value,
              //   }))
              // }
            />

            <SelectField
              label="Au"
              name="to"
              value={1}
              optionsData={[1, 2, 3, 4, 5, 6, 7, 8]}
              defaultText="Tout"
              defaultTextValue="0"
              // render={(date) => <div>{formatISODate(date, "date")}</div>}
              // onChange={(e) =>
              //   setFilterByDate((prev) => ({
              //     ...prev,
              //     to: e.target.value,
              //   }))
              // }
            />
          </div>
          */}

          <div className="w-fit">
            <StockAdd />
          </div>
        </div>
        <div>
          <div>
            <Table data={stocks} columns={stockColumns} />
          </div>
        </div>
      </div>
    </>
  );
}

function SuppliersSection() {
  const { suppliers, addSupplier } = useSupplier();
  const [opentAddModal, setOpentAddModal] = useState(false);
  const [supplierSearchName, setSupplierSearchName] = useState("");
  const [supplierSate, setSupplierState] = useState<SupplierType>(INITIAL_SUPPLIER);

  return (
    <>
      <Modal
        showModal={opentAddModal}
        setShowModal={setOpentAddModal}
        content={<SupplierAdd supplier={supplierSate} setSupplier={setSupplierState} />}
        actionButtonShow
        actionButtonText="AJOUTER"
        actionButtonOnClick={() => {
          addSupplier(supplierSate);
          setSupplierState(INITIAL_SUPPLIER);
        }}
      />
      <div className="h-full w-full flex flex-col">
        <SectionTitle>Fournisseurs</SectionTitle>
        <div className="pb-2 mb-2 border-b">
          <TextField
            label="Recherche"
            name="filter"
            type="text"
            value={supplierSearchName}
            clrearValue={() => setSupplierSearchName("")}
            onChange={(e) => setSupplierSearchName(e.target.value)}
          />
        </div>
        <div className="h-full w-full overflow-y-scroll">
          {suppliers
            .filter((supplier) =>
              supplier.name.toLocaleLowerCase().includes(supplierSearchName.toLocaleLowerCase())
            )
            .map((supplier: SupplierType, i) => (
              <div key={i} className="border-b py-2">
                <div className="font-bold line-clamp-1">{supplier.name}</div>
                <div className="flex items-center gap-1 text-sm">
                  <div>{supplier.phone}</div>
                  <div>*</div>
                  <div className="line-clamp-1">{supplier.address}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full h-fit mt-2 pt-2 border-t">
          <Button handleClick={() => setOpentAddModal(true)} icon={<Plus />} text="Ajouter" />
        </div>
      </div>
    </>
  );
}

function StocksScreen() {
  return (
    <div className="flex gap-2 w-full h-full">
      <div className="w-full h-full bg-white/60 p-2 rounded-xl">
        <ProductProvider>
          <StockProvider>
            <StocksSection />
          </StockProvider>
        </ProductProvider>
      </div>

      <div className="w-96 h-full bg-white/60 p-2 rounded-xl">
        <SupplierProvider>
          <SuppliersSection />
        </SupplierProvider>
      </div>
    </div>
  );
}

export default StocksScreen;
