import useTheme from "../../stores/theme";

interface NumericPadProps {
  variant?: "light" | "dark";
  handleNumeric?: (arg: any) => any;
  handleDecimal?: (arg: any) => any;
  handleClear?: (arg: any) => any;
}

function NumericPad({ variant = "light", handleNumeric, handleDecimal, handleClear }: NumericPadProps) {
  const { activeTheme } = useTheme();
  return (
    <div className="grid grid-cols-3 h-full w-full gap-2 font-bold">
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="7"
        className={`w-full h-full rounded-md `}
      >
        7
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="8"
        className={`w-full h-full rounded-md`}
      >
        8
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="9"
        className={`w-full h-full rounded-md`}
      >
        9
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="4"
        className={`w-full h-full rounded-md`}
      >
        4
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="5"
        className={`w-full h-full rounded-md`}
      >
        5
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="6"
        className={`w-full h-full rounded-md`}
      >
        6
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="1"
        className={`w-full h-full rounded-md`}
      >
        1
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="2"
        className={`w-full h-full rounded-md`}
      >
        2
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="3"
        className={`w-full h-full rounded-md`}
      >
        3
      </button>
      <button onClick={handleClear} className="w-full h-full rounded-md bg-red-500">
        AC
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleNumeric}
        value="0"
        className={`w-full h-full rounded-md`}
      >
        0
      </button>
      <button
        style={{ backgroundColor: variant == "light" ? activeTheme[100] : activeTheme[700], color: variant == "light" ? "" : activeTheme[50] }}
        onClick={handleDecimal}
        className={`w-full h-full rounded-md`}
      >
        {handleDecimal && "."}
      </button>
    </div>
  );
}

export default NumericPad;
