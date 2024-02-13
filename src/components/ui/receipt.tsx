import { CartType, CustomerType } from "../../lib/types";
import { LegacyRef } from "react";

interface ReceiptProps {
  receiptRef?: LegacyRef<HTMLDivElement> | null;
  totalPrice: number;
  deposit: number;
  receiptNo: string;
  client: CustomerType | null;
  products: CartType[];
}

function Receipt({
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
      className="text-[black] relative flex flex-col aspect-[1/1.41] object-contain w-auto h-full mx-auto bg-[white] rounded-md overflow-hidden"
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
                  <th className="py-1 px-2 border border-t-0 border-black text-left">
                    Désignation
                  </th>
                  <th className="py-1 px-2 border border-t-0 border-black text-left">P.Unit</th>
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
                        <div className="text-xs opacity-70 line-clamp-1">{product.optionName}</div>
                      )}
                    </td>
                    <td className="py-1 px-1 text-center border-b border-r">{product.price}</td>
                    <td className="py-1 px-1 text-right border-b">
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

export default Receipt;
