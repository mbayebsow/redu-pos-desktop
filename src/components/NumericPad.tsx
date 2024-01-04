import { useCart } from "../contexts/Cart.context";
import { useState } from "react";
import { CartType, ClientType } from "../types";

type ReceiptProps = { totalPrice: number; deposit: number; receiptNo: string; client: ClientType | null; products: CartType[] };

function Receipt({ totalPrice, deposit, receiptNo, client, products }: ReceiptProps) {
  return (
    <div className="flex flex-col text-left text-black w-full h-full text-sm p-4 overflow-y-auto bg-white">
      <div className="text-center pb-2">Name</div>

      <div className="flex flex-col gap-2">
        <div className="flex">
          <div className="border border-black p-2 flex flex-row rounded-md">
            <p>Client:</p>
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
            <p>
              <span>N° {receiptNo} </span>
              <span></span>
            </p>
            <span></span>
          </div>
        </div>

        <div className="shrink-0 h-full border border-black rounded-md overflow-hidden">
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

        <div className="flex-1 w-auto h-auto border text-left border-black rounded-md p-2 ml-auto">
          <div className="flex text-xs font-bold">
            <div className="flex-grow mr-2">TOTAL :</div>
            <div> {totalPrice} </div>
          </div>
          <hr className="my-2" />
          <div className="flex text-xs font-semibold">
            <div className="flex-grow mr-2">CASH :</div>
            <div> {deposit} </div>
          </div>
          <hr className="my-2" />
          <div className="flex text-xs font-semibold">
            <div className="flex-grow mr-2">DIFF :</div>
            <div> {totalPrice - deposit} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const { cartTotal, cartDeposit, cartProducts, cartClient } = useCart();

  return (
    <>
      <button
        disabled={cartTotal === 0}
        onClick={() => setShowModal(true)}
        className={`h-fit ${
          cartTotal === 0 ? "bg-green-300" : "bg-green-500"
        } text-white text-center text-3xl font-bold w-full py-3 focus:outline-none`}
      >
        PAYER
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <Receipt totalPrice={cartTotal} deposit={cartDeposit} products={cartProducts} client={cartClient} receiptNo="ddfgdfgf" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                  <button
                    className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50  fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default function NumericPad() {
  const { cartTotal, cartDeposit, addDeposit } = useCart();

  const handleNumeric = (number: number) => {
    const newDeposit = cartDeposit.toString() + number.toString();
    addDeposit(Number(newDeposit));
    console.log(Number(newDeposit));
  };

  return (
    <>
      <div className="shadow rounded-md w-1/4 flex flex-col justify-between h-full bg-black overflow-hidden">
        <div className="h-fit">
          <div className="m-2 rounded-md w-auto bg-white text-black font-semibold py-2 px-2">
            <div className="text-xs">TOTAL</div>
            <div>
              <div className="text-3xl -mt-1 text-right"> {cartTotal} </div>
            </div>
          </div>

          <div className="m-2 rounded-md w-auto bg-white text-black font-semibold py-2 px-2">
            <div className="text-xs text-left">CASH</div>
            <div>
              <div className="text-3xl -mt-1 text-right"> {cartDeposit} </div>
            </div>
          </div>

          <div className="m-2 rounded-md w-auto bg-red-500 text-white font-semibold py-2 px-2">
            <div className="text-xs">
              DIFFÉRENCE: {cartTotal - cartDeposit < 0 ? "Monnaie" : cartTotal - cartDeposit > 0 ? "Réste à payer" : null}{" "}
            </div>
            <div>
              <div className="text-3xl -mt-1 text-right"> {Number((cartTotal - cartDeposit).toPrecision(4))} </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="m-2 rounded-md text-blue-gray-700 p-2 h-fit w-auto text-center bg-white/20">
            <div className="w-full flex gap-3 text-white">
              <button onClick={() => addDeposit(cartTotal / 4)} className="w-full p-1 bg-black rounded-md">
                {Number((cartTotal / 4).toPrecision(4))}
              </button>
              <button onClick={() => addDeposit(cartTotal / 3)} className="w-full p-1 bg-black rounded-md">
                {Number((cartTotal / 3).toPrecision(4))}
              </button>
              <button onClick={() => addDeposit(cartTotal / 2)} className="w-full p-1 bg-black rounded-md">
                {Number((cartTotal / 2).toPrecision(4))}
              </button>
              <button onClick={() => addDeposit(cartTotal)} className="w-full p-1 bg-green-500 text-white rounded-md">
                {Number(cartTotal.toPrecision(4))}
              </button>
            </div>

            <hr className="my-2" />

            <div className="grid grid-cols-3 gap-1 pb-1">
              <button
                onClick={() => handleNumeric(1)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                1
              </button>
              <button
                onClick={() => handleNumeric(2)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                2
              </button>
              <button
                onClick={() => handleNumeric(3)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                3
              </button>
              <button
                onClick={() => handleNumeric(4)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                4
              </button>
              <button
                onClick={() => handleNumeric(5)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                5
              </button>
              <button
                onClick={() => handleNumeric(6)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                6
              </button>
              <button
                onClick={() => handleNumeric(7)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                7
              </button>
              <button
                onClick={() => handleNumeric(8)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                8
              </button>
              <button
                onClick={() => handleNumeric(9)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                9
              </button>
              <button
                onClick={() => addDeposit(0)}
                className="rounded-md h-10 leading-10 bg-red-400 text-blue-gray-900 shadow hover:shadow-lg focus:outline-none"
              >
                C
              </button>
              <button
                onClick={() => handleNumeric(0)}
                className="rounded-md h-10 leading-10 bg-black text-white text-xl font-bold shadow hover:shadow-lg hover:bg-slate-50 hover:text-blue-gray-900 focus:outline-none"
              >
                0
              </button>
              <button className="rounded-md h-10 leading-10 bg-yellow-400 text-blue-gray-900 shadow hover:shadow-lg focus:outline-none">←</button>
            </div>
          </div>
          <Modal />
        </div>
      </div>
    </>
  );
}
