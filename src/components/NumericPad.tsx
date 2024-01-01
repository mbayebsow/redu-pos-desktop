import { useCart } from "../contexts/CartContext";

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

          <button className="h-fit bg-green-500 text-white text-center text-3xl font-bold w-full py-3 focus:outline-none">PAYER</button>
        </div>
      </div>
    </>
  );
}
