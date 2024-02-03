import { useEffect, useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import useSound from "../../hooks/useSound";
import NumericPad from "../pos/numeric-pad";

interface CalculatorContentProps {
  shouldEval: boolean;
  setShouldEval: (sate: boolean) => any;
}
function CalculatorContent({ shouldEval, setShouldEval }: CalculatorContentProps) {
  const { playPhoneKeypad, playClear, playButtonPress } = useSound();
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("0");
  const [sign, setSign] = useState<string | null>(null);
  const [decimal, setDecimal] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleNumeric = (e: any) => {
    const value = e.target.value;

    if (input === "0" || sign) {
      setInput(value);
      setSign(null);
    } else {
      setInput((prevData) => prevData + value);
    }

    !formula || formula === "0" ? setFormula(value) : setFormula((prevData) => prevData + value);
    playPhoneKeypad();
  };

  const handleSign = (e: any) => {
    const value = e.target.value;
    setInput(value);
    setSign(value);
    setDecimal(false);
    if ((sign && value !== "-") || sign === "-") {
      let newFormula;
      sign === "-" ? (newFormula = formula.slice(0, -2)) : (newFormula = formula.slice(0, -1));
      setFormula(newFormula + value);
    } else {
      if (result) {
        setFormula(result + value);
      } else {
        setFormula((prevData) => prevData + value);
      }
    }
    playButtonPress();
  };

  const handleDecimal = () => {
    if (decimal) return;
    setDecimal(true);
    setInput((prevData) => prevData + ".");
    setFormula((prevData) => prevData + ".");
    playPhoneKeypad();
  };

  const handleEvaluate = () => {
    const r = eval(formula);
    setInput(r);
    setFormula((prevData) => prevData + " = " + r);
    setDecimal(false);
    setResult(r);
    playButtonPress();
  };

  const handleClear = () => {
    setFormula("0");
    setInput("0");
    setSign(null);
    setDecimal(false);
    setResult(null);
    playClear();
  };

  useEffect(() => {
    if (!shouldEval) return;
    handleEvaluate();
    setShouldEval(false);
  }, [shouldEval]);

  return (
    <div className="w-full h-96 flex flex-col p-2 gap-3 text-lg">
      <div className="w-full h-28 p-2 gap-2 flex flex-col rounded-lg bg-primary-100 text-right">
        <div className="w-full h-2/5 border-b border-primary-200 pb-1 text-sm">{formula}</div>
        <div className="w-full h-3/5 text-2xl font-bold">{input}</div>
      </div>

      <div className="w-full h-full flex gap-2">
        <div className="h-full w-3/4">
          <NumericPad
            handleClear={handleClear}
            handleDecimal={handleDecimal}
            handleNumeric={handleNumeric}
          />
        </div>

        <div className="h-auto w-1/4 flex flex-col gap-2">
          <button
            onClick={handleSign}
            id="multiply"
            value="*"
            className="w-full h-1/4 rounded-lg bg-primary-200"
          >
            x
          </button>
          <button
            onClick={handleSign}
            id="subtract"
            value="-"
            className="w-full h-1/4 rounded-lg bg-primary-200"
          >
            -
          </button>
          <button
            onClick={handleSign}
            id="add"
            value="+"
            className="w-full h-1/4 rounded-lg bg-primary-200"
          >
            +
          </button>
          <button
            onClick={handleSign}
            id="divide"
            value="/"
            className="w-full h-1/4 rounded-lg bg-primary-200"
          >
            /
          </button>
        </div>
      </div>
    </div>
  );
}

function Calculator() {
  const [openCalculator, setOpenCalculator] = useState(false);
  const [shouldEval, setShouldEval] = useState(false);

  return (
    <div>
      <Modal
        showModal={openCalculator}
        setShowModal={setOpenCalculator}
        content={<CalculatorContent shouldEval={shouldEval} setShouldEval={setShouldEval} />}
        actionButtonShow
        actionButtonText="Calculer"
        actionButtonOnClick={() => setShouldEval(true)}
      />
      <Button
        separator
        roundedBorder="full"
        variant="tonal"
        text="Caculatrice"
        handleClick={() => setOpenCalculator(true)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="16" x2="16" y1="14" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
          </svg>
        }
      />
    </div>
  );
}

export default Calculator;
