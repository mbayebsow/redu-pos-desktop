import ReactBarcode from "react-jsbarcode";
import { CartType, CustomerType } from "../../lib/types";
import { LegacyRef } from "react";
import reduIcon from "../../assets/icon.png";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ReceiptProps {
  receiptRef?: LegacyRef<HTMLDivElement> | null;
  totalPrice: number;
  deposit: number;
  receiptNo: string;
  client: CustomerType | null;
  products: CartType[];
}

function ReceiptV1({
  receiptRef = null,
  totalPrice,
  deposit,
  receiptNo,
  client,
  products,
}: ReceiptProps) {
  return (
    <div
      ref={receiptRef}
      className="text-[black] relative flex flex-col aspect-[1/1.41] w-auto h-full mx-auto bg-[white] rounded-md overflow-scroll"
    >
      <div className="text-center h-20 flex justify-center items-center font-extrabold text-3xl  border-b border-dashed border-black w-full">
        REDU POS SYSTEM
      </div>

      <div className="flex flex-col gap-2 justify-between h-full p-5">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between">
            <div className="border w-fit border-black p-2 flex flex-row gap-2 rounded-md">
              <p className="font-bold">Client:</p>
              <div className="w-fit">
                {client ? (
                  <div className="">
                    <p className="text-xs ml-1">
                      {client.firstName} {client.lastName}
                    </p>
                    <p className="text-xs ml-1">{client.phone}</p>
                    <p className="text-xs ml-1">{client.address}</p>
                  </div>
                ) : (
                  " - - -"
                )}
              </div>
            </div>
            <div className="text-right ml-10 w-auto">
              <div className="font-bold">FACTURE</div>
              <span className="text-xs w-fit">N° {receiptNo} </span>
            </div>
          </div>

          <div className="h-full border border-black rounded-md overflow-hidden">
            <table className="w-full text-xs px-2">
              <thead className="text-black px-2">
                <tr className="">
                  <th className="py-1 px-2 border border-t-0 border-l-0 border-black w-2/16 text-center">
                    Qté
                  </th>
                  <th className="py-1 px-2 text-left">Désignation</th>
                  <th className="py-1 px-2 text-right">P.Unit</th>
                  <th className="py-1 px-2 border border-t-0 border-r-0 border-black w-3/12 text-right">
                    S.Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.identifier} className="">
                    <td className="py-1 px-1 text-center border-b border-r">{product.quantity}</td>
                    <td className="py-1 px-1 text-left border-b border-r">
                      <div>{product.productName}</div>
                      {product.optionName && (
                        <div className="text-xs opacity-70 line-clamp-1 px-2">
                          {product.optionName}
                        </div>
                      )}
                    </td>
                    <td className="py-1 px-2 text-right border-b border-r">{product.price}</td>
                    <td className="py-1 px-2 text-right border-b">
                      {product.price * product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 w-52 h-fit border text-left border-black rounded-md p-2 ml-auto">
          <div className="flex text-xs">
            <div className="flex-grow mr-2">TOTAL :</div>
            <div className="font-bold"> {totalPrice} </div>
          </div>
          <hr className="my-2" />
          <div className="flex text-xs">
            <div className="flex-grow mr-2">CASH :</div>
            <div className="font-bold"> {deposit} </div>
          </div>
          <hr className="my-2" />
          <div className="flex text-xs">
            <div className="flex-grow mr-2">DIFF :</div>
            <div className="font-bold"> {totalPrice - deposit} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptV2({
  receiptRef = null,
  totalPrice,
  deposit,
  receiptNo,
  client,
  products,
}: ReceiptProps) {
  return (
    <div
      ref={receiptRef}
      className="text-black relative flex flex-col w-full h-full py-2 px-4 mx-auto bg-white overflow-scroll text-sm"
    >
      <div className="h-fit text-center  justify-center items-start gap-2 w-full">
        <div className="h-12 w-12 mx-auto mb-1">
          <img src={reduIcon} className="h-full" />
        </div>
        <div className="text-xs">
          <div className="font-bold">REDU POS SYSTEM</div>
          <div>Tel: +221 78 010 89 62</div>
          <div>Mail: mbaye-sow@outlook.com</div>
        </div>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="w-full flex items-center justify-between font-bold">
        <div className="text-left w-[10%]">Qté</div>
        <div className="text-left w-[40%]">Désignation</div>
        <div className="text-right w-[25%]">P.Unit</div>
        <div className="text-right w-[25%]">S.Total</div>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="w-full">
        {products.map((product) => (
          <div key={product.identifier} className="w-full flex items-center justify-between mb-1">
            <div className="w-[10%]">{product.quantity}</div>
            <div className="w-[40%] text-left">
              <div>{product.productName}</div>
              {product.optionName && <div className="text-xs opacity-70">{product.optionName}</div>}
            </div>
            <div className="text-right w-[25%]">{product.price}</div>
            <div className="text-right w-[25%]">{product.price * product.quantity}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="flex items-center justify-between w-full font-bold">
        <div>Sous total</div>
        <div>{totalPrice}</div>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div>Remise sur produit</div>
          <div>0</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>Remise sur transaction</div>
          <div>0</div>
        </div>
        <div className="flex items-center justify-between w-full font-bold">
          <div>Total Remise</div>
          <div>0</div>
        </div>
      </div>

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="w-full">
        <div className="flex items-center justify-between w-full font-bold">
          <div>Net a payer</div>
          <div>{totalPrice}</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>Montant reçu</div>
          <div>{deposit}</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>Difference</div>
          <div className="flex items-center gap-1">
            <div>
              {totalPrice - deposit < 0 ? (
                <ArrowUp size={15} />
              ) : (
                totalPrice - deposit > 0 && <ArrowDown size={15} />
              )}
            </div>
            <div>{totalPrice - deposit}</div>
          </div>
        </div>
      </div>

      {client && (
        <div className="w-full">
          <div className="border-b border-dashed border-black my-2"></div>
          <div className="font-bold">Client :</div>
          <div>
            <div className="flex items-center justify-between w-full">
              <div>Nom</div>
              <div>
                {client.firstName} {client.lastName}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>Telephone</div>
              <div>{client.phone}</div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>Adresse</div>
              <div>{client.address}</div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b border-dashed border-black my-2"></div>

      <div className="w-fit mx-auto">
        <ReactBarcode value={receiptNo} />
      </div>
    </div>
  );
}

const Receipt = ReceiptV2;
export default Receipt;
