import { useReactToPrint } from "react-to-print";
import { CartType, ClientType } from "../../types";
import { useRef } from "react";

type ReceiptProps = { totalPrice: number; deposit: number; receiptNo: string; client: ClientType | null; products: CartType[] };

function Receipt({ totalPrice, deposit, receiptNo, client, products }: ReceiptProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      ref={componentRef}
      onClick={handlePrint}
      className="relative flex flex-col aspect-[1/1.41] object-contain w-auto h-full mx-auto bg-white rounded-md"
    >
      <div className="text-center h-20 flex justify-center items-center font-extrabold text-3xl  border-b border-dashed border-black">
        REDU POS SYSTEM
      </div>

      <div className="flex flex-col gap-2 justify-between h-full p-5">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between">
            <div className="border border-black p-2 flex flex-row gap-2 rounded-md">
              <p className="uppercase font-bold text-md">Client:</p>
              <div>
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
            <div className="text-right ml-10">
              <div className="text-xl font-bold">FACTURE</div>
              <span className="text-xs">N° {receiptNo} </span>
            </div>
          </div>

          <div className="h-full border border-black rounded-md overflow-hidden">
            <table className="w-full text-xs px-2">
              <thead className="text-black px-2">
                <tr className="">
                  <th className="py-1 px-2 border border-t-0 border-l-0 border-black w-2/12 text-center">Qté</th>
                  <th className="py-1 px-2 border border-t-0 border-black text-left">Désignation</th>
                  <th className="py-1 px-2 border border-t-0 border-black text-left">P.Unit</th>
                  <th className="py-1 px-2 border border-t-0 border-r-0 border-black w-3/12 text-right">S.Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border border-black">
                    <td className="py-1 px-1 text-center border border-gray"> {product.qty} </td>
                    <td className="py-1 px-1 text-left border border-gray"> {product.name} </td>
                    <td className="py-1 px-1 text-left border border-gray"> {product.price} </td>
                    <td className="py-1 px-1 text-right border border-gray"> {product.price * product.qty} </td>
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
