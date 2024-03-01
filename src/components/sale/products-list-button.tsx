import { memo, useState } from "react";
import useSaleStore from "../../stores/sale";
import Button from "../ui/button";
import { ArrowRight, Eye, LayoutList } from "lucide-react";
import Modal from "../ui/modal";
import ReactBarcode from "react-jsbarcode";

function ProductsSaleList({ saleId }) {
  const getSaleItemsBySaleId = useSaleStore((state) => state.getSaleItemsBySaleId);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="w-full h-fit text-sm flex flex-col divide-y">
        {saleId &&
          getSaleItemsBySaleId(saleId).map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 w-full">
              <img className="aspect-square h-full w-12 rounded-lg" src={item.product.image} />
              <div className="w-full mr-5">
                <div className="w-full">{item.product.name}</div>
                <div className="text-xs">
                  {item.product.priceSale} x {item.quantity}
                </div>
              </div>
              <div className="">
                <ReactBarcode className="w-24 h-fit" value={item.product.identifier} options={{ fontSize: 30 }} />
              </div>
              <div>
                <Button variant="icon" icon={<ArrowRight />} handleClick={() => null} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ProductsListButton({ saleId }) {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <>
      <Modal showModal={showProducts} setShowModal={setShowProducts} content={<ProductsSaleList saleId={saleId} />} />
      <Button variant="icon" icon={<LayoutList />} handleClick={() => setShowProducts(true)} />
    </>
  );
}

export default memo(ProductsListButton);
