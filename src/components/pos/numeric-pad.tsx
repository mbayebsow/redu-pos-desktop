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

export default NumericPad;
