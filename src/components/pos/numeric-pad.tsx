import { useCart } from "../../contexts/cart-context";
import useSound from "../../hooks/useSound";

interface NumericPadProps {
  variant?: "light" | "dark";
  handleNumeric?: (arg: any) => any;
  handleDecimal?: (arg: any) => any;
  handleClear?: (arg: any) => any;
}

function NumericPad({
  variant = "light",
  handleNumeric,
  handleDecimal,
  handleClear,
}: NumericPadProps) {
  return (
    <div className="grid grid-cols-3 h-full w-full gap-2">
      <button
        onClick={handleNumeric}
        value="7"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"} `}
      >
        7
      </button>
      <button
        onClick={handleNumeric}
        value="8"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        8
      </button>
      <button
        onClick={handleNumeric}
        value="9"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        9
      </button>
      <button
        onClick={handleNumeric}
        value="4"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        4
      </button>
      <button
        onClick={handleNumeric}
        value="5"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        5
      </button>
      <button
        onClick={handleNumeric}
        value="6"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        6
      </button>
      <button
        onClick={handleNumeric}
        value="1"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        1
      </button>
      <button
        onClick={handleNumeric}
        value="2"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        2
      </button>
      <button
        onClick={handleNumeric}
        value="3"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        3
      </button>
      <button onClick={handleClear} className="w-full h-full rounded-lg bg-red-500">
        AC
      </button>
      <button
        onClick={handleNumeric}
        value="0"
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        0
      </button>
      <button
        onClick={handleDecimal}
        className={`w-full h-full rounded-lg ${variant == "light" && "bg-primary-100"} ${variant == "dark" && "bg-primary-700 text-primary-50"}`}
      >
        {handleDecimal && "."}
      </button>
    </div>
  );
}

function NumericPadV1() {
  const { cartTotal, cartDeposit, addDeposit } = useCart();
  const { playPhoneKeypad } = useSound();

  const handleNumeric = (number: number) => {
    playPhoneKeypad();
    const newDeposit = cartDeposit.toString() + number.toString();
    addDeposit(Number(newDeposit));
  };

  return (
    <div className="rounded-md text-blue-gray-700 h-fit w-auto text-center">
      <div className="w-full flex gap-3 text-white">
        <button
          onClick={() => addDeposit(cartTotal / 3)}
          className="w-full p-1 bg-primary-700 rounded-md"
        >
          {Number((cartTotal / 3).toPrecision(4))}
        </button>
        <button
          onClick={() => addDeposit(cartTotal / 2)}
          className="w-full p-1 bg-primary-700 rounded-md"
        >
          {Number((cartTotal / 2).toPrecision(4))}
        </button>
        <button
          onClick={() => addDeposit(cartTotal)}
          className="w-full p-1 bg-primary-200 text-primary-900 rounded-md"
        >
          {Number(cartTotal.toPrecision(4))}
        </button>
      </div>

      <hr className="my-2 text-primary-500" />

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleNumeric(1)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          1
        </button>
        <button
          onClick={() => handleNumeric(2)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          2
        </button>
        <button
          onClick={() => handleNumeric(3)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          3
        </button>
        <button
          onClick={() => handleNumeric(4)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          4
        </button>
        <button
          onClick={() => handleNumeric(5)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          5
        </button>
        <button
          onClick={() => handleNumeric(6)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          6
        </button>
        <button
          onClick={() => handleNumeric(7)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          7
        </button>
        <button
          onClick={() => handleNumeric(8)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          8
        </button>
        <button
          onClick={() => handleNumeric(9)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          9
        </button>
        <button
          onClick={() => addDeposit(0)}
          className="rounded-md h-10 text-white text-xl font-bold bg-red-500"
        >
          C
        </button>
        <button
          onClick={() => handleNumeric(0)}
          className="rounded-md h-10 leading-10 bg-primary-700 text-white text-xl font-bold shadow hover:shadow-lg hover:bg-primary-600 hover:text-blue-gray-900 focus:outline-none"
        >
          0
        </button>
        <button className="rounded-md h-10 text-white text-xl font-bold bg-yellow-500">←</button>
      </div>
    </div>
  );
}

export default NumericPad;
