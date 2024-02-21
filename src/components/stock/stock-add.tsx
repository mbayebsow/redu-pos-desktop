import { Plus, Search, X } from "lucide-react";
import { Dispatch, SetStateAction, memo, useCallback, useRef, useState } from "react";

import {
  ProductOptionType,
  StockReplenishmentItemsType,
  StockReplenishmentType,
} from "../../lib/types";
import { useProduct } from "../../contexts/product-context";
import SelectOption from "../shared/select-option";

import SelectField from "../ui/select-field";
import TextField from "../ui/text-field";
import Popup from "../ui/popup";
import Button from "../ui/button";
import { getSuppliers } from "../../services/supplier-services";
import DateField from "../ui/date-field";
import { useStock } from "../../contexts/stock-context";
import Drawer from "../ui/drawer";
import ProductsList from "../product/products-list";
import useSound from "../../hooks/useSound";

// interface StockAddProps {
//   stocks: StockTransactionsType[];
//   setStock: (index: number, name: string, value: string | number) => void;
//   addStockRow: (identifier: string, initialtQuantity: number) => void;
// }

interface ProductSectionProps {
  handleAddStock: (identifier: string) => void;
}

interface StockSectionProps {
  stockItems: StockReplenishmentItemsType[];
  stockHead: StockReplenishmentType;
  setStockHead: Dispatch<SetStateAction<StockReplenishmentType>>;
  handleRemoveItem: (index: number) => void;
  handleSetStock: (index: number, name: string, value: string | number) => void;
  saveStockReplenishment: () => void;
}

const INITIAL_STOCK: StockReplenishmentType = {
  id: 0,
  supplier: null,
  totalAmountOrder: 0,
  payAmount: 0,
  status: "completed",
  date: new Date(),
};

function ProductSection({ handleAddStock }: ProductSectionProps) {
  const [filterProduct, setFilterProduct] = useState("");
  const [showSelectPopup, setShowSelectPopup] = useState(false);
  const [productOptions, setProductOptions] = useState<ProductOptionType[] | null>(null);

  return (
    <>
      <Popup
        title="Choisir une option"
        showPopup={showSelectPopup}
        setShowPopup={setShowSelectPopup}
        content={
          <SelectOption
            options={productOptions}
            onSelectOption={(idenfier) => {
              handleAddStock(idenfier);
              setShowSelectPopup(false);
            }}
          />
        }
      />
      <div className="h-full w-1/2  flex flex-col gap-1">
        <div className="p-2 text-xl font-bold w-2/3">Réapprovisionnement de stock</div>
        <div className="w-full">
          <TextField
            label={<Search size={15} />}
            placeholder="Recherche par nom ou identifiant"
            name="search"
            type="text"
            value={filterProduct}
            clrearValue={() => setFilterProduct("")}
            onChange={(e) => setFilterProduct(e.target.value)}
          />
        </div>
        <div className="overflow-y-scroll w-full">
          <div className="grid grid-cols-4 gap-2">
            <ProductsList
              display="card"
              filterByName={filterProduct}
              handleClick={(product) => {
                if (product.type === "variable" && product.options) {
                  setProductOptions(product.options);
                  setShowSelectPopup(true);
                } else {
                  handleAddStock(product.identifier);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function StockSection({
  stockHead,
  stockItems,
  setStockHead,
  handleSetStock,
  handleRemoveItem,
  saveStockReplenishment,
}: StockSectionProps) {
  const { getproductById } = useProduct();
  return (
    <div className="py-2 h-full w-1/2 bg-primary-100 rounded-xl border border-primary-200 flex flex-col gap-2">
      <div className="h-full w-full flex flex-col px-2 overflow-hidden gap-2">
        <div className="p-2 bg-white rounded-lg h-fit">
          <div className="flex w-full">
            <DateField label="Date" onSelect={(date) => setStockHead({ ...stockHead, date })} />
            <SelectField
              name="status"
              label="Status"
              value={stockHead.status}
              optionsValue="value"
              optionsText="name"
              optionsData={[
                { name: "En attente", value: "pending" },
                { name: "En cours", value: "in progress" },
                { name: "Terminée", value: "completed" },
              ]}
              onChange={(e) => setStockHead({ ...stockHead, status: e.target.value })}
            />
          </div>
          <SelectField
            name="suplier"
            label="Fournisseur"
            value={stockHead.supplier === 0 ? "null" : stockHead.supplier}
            optionsValue="id"
            optionsText="name"
            defaultText="- - -"
            defaultTextValue="null"
            optionsData={getSuppliers()}
            onChange={(e) => setStockHead({ ...stockHead, supplier: Number(e.target.value) })}
          />
          <TextField
            name="totalAmountOrder"
            label="Montant total du commande"
            type="number"
            value={stockHead.totalAmountOrder === 0 ? "" : stockHead.totalAmountOrder}
            onChange={(e) =>
              setStockHead({ ...stockHead, totalAmountOrder: Number(e.target.value) })
            }
          />
          <TextField
            name="payAmount"
            label="Montant payé"
            type="number"
            value={stockHead.payAmount === 0 ? "" : stockHead.payAmount}
            onChange={(e) => setStockHead({ ...stockHead, payAmount: Number(e.target.value) })}
          />
        </div>

        <div className="w-full h-full overflow-hidden border-y border-primary-200">
          <div className="overflow-y-scroll w-full h-full">
            {stockItems.map((stock, i) => (
              <div key={i} className="py-2">
                <div className="flex items-center justify-between p-2 px-3 bg-white rounded-lg mb-1 text-sm">
                  <div className="w-full">
                    <div className="font-semibold">
                      {getproductById(stock.productIdentifier)?.name}
                    </div>
                    <div className="font-semibold">
                      <span className="font-normal">Identifinat:</span> {stock.productIdentifier}
                    </div>
                    <div className="font-semibold">
                      <span className="font-normal">Quantité actuelle:</span>{" "}
                      {stock.initialtQuantity}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveItem(i)}
                      className="p-1 w-fit h-fit rounded-full bg-red-100"
                    >
                      <X color="red" size={12} />
                    </button>
                  </div>
                </div>

                <TextField
                  name="newQuantity"
                  label="Quantité supplementaire"
                  type="number"
                  variant="outlined"
                  roundedBorder="lg"
                  value={stock.newQuantity === 0 ? "" : stock.newQuantity}
                  onChange={(e) => handleSetStock(i, e.target.name, Number(e.target.value))}
                  clrearValue={(e) => handleSetStock(i, e.target.name, 0)}
                />
                <div className="flex items-center gap-0">
                  <TextField
                    name="priceCost"
                    label="P.Achat"
                    type="number"
                    variant="outlined"
                    roundedBorder="lg"
                    value={stock.priceCost === 0 ? "" : stock.priceCost}
                    onChange={(e) => handleSetStock(i, e.target.name, Number(e.target.value))}
                    //   clrearValue={() => setSupplier({ ...supplier, name: "" })}
                  />
                  <TextField
                    name="priceSale"
                    label="P.Vente"
                    type="number"
                    variant="outlined"
                    roundedBorder="lg"
                    value={stock.priceSale === 0 ? "" : stock.priceSale}
                    onChange={(e) => handleSetStock(i, e.target.name, Number(e.target.value))}
                    //   clrearValue={() => setSupplier({ ...supplier, name: "" })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-fit px-2">
        <Button icon={<Plus />} handleClick={saveStockReplenishment}>
          Enregister
        </Button>
      </div>
    </div>
  );
}

function StockAddScreen() {
  const { playBeep } = useSound();
  const { addStock } = useStock();
  const { getproductById } = useProduct();
  const [stockItems, setStockItems] = useState<StockReplenishmentItemsType[] | []>([]);
  const [stockHead, setStockHead] = useState<StockReplenishmentType>(INITIAL_STOCK);

  const handleSetStockItem = (index: number, name: string, value: string | number) => {
    const updatedOptions = [...stockItems];
    updatedOptions[index][name] = value;
    setStockItems(updatedOptions);
  };

  const handleAddStockItem = (identifier: string) => {
    const index = stockItems.findIndex((stock) => stock.productIdentifier === identifier);

    if (index > -1) {
      handleSetStockItem(index, "newQuantity", stockItems[index].newQuantity + 1);
    } else {
      const product = getproductById(identifier);
      if (product) {
        setStockItems([
          ...stockItems,
          {
            id: 0,
            stockId: 0,
            productIdentifier: identifier,
            initialtQuantity: product.stockQuantity,
            newQuantity: 1,
            priceCost: 0,
            priceSale: 0,
            date: new Date(),
          },
        ]);
      }
    }
    playBeep();
  };

  const deleteStockItem = (index: number) => {
    const newItems = [...stockItems];
    newItems.splice(index, 1);
    setStockItems(newItems);
  };

  const resetValue = () => {
    setStockItems([]);
    setStockHead(INITIAL_STOCK);
  };

  return (
    <>
      <div className="flex relative items-start h-full w-[65vw] overflow-hidden p-2 gap-2 bg-white">
        <ProductSection handleAddStock={handleAddStockItem} />
        <StockSection
          stockHead={stockHead}
          setStockHead={setStockHead}
          stockItems={stockItems}
          handleSetStock={handleSetStockItem}
          handleRemoveItem={deleteStockItem}
          saveStockReplenishment={() => addStock(stockHead, stockItems, resetValue)}
        />
      </div>
    </>
  );
}

function StockAdd() {
  const [opentAddModal, setOpentAddModal] = useState(false);
  return (
    <>
      <Drawer
        showDrawer={opentAddModal}
        setShowDrawer={setOpentAddModal}
        content={<StockAddScreen />}
      />
      <div className="w-fit">
        <Button roundedBorder="full" icon={<Plus />} handleClick={() => setOpentAddModal(true)}>
          Ajouter
        </Button>
      </div>
    </>
  );
}

export default memo(StockAdd);
