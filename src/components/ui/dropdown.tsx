import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { playBeep } from "../../utils/interactive-sound";
import useTheme from "../../stores/theme";

interface DropdownProps {
  label: string;
  options?: string[];
  children?: ReactNode;
  variant?: "filled" | "tonal" | "transparent";
  onSelect?: (option: string) => void;
}

function Dropdown({ label, options, children, variant = "filled", onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme } = useTheme();

  return (
    <div className="p-[2px] relative z-30 flex w-fit h-10 items-center gap-2 justify-center">
      <button
        style={{
          backgroundColor: variant === "filled" ? activeTheme[800] : variant === "tonal" ? activeTheme[50] : "",
          color: variant === "filled" ? activeTheme[50] : activeTheme[800],
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          playBeep();
        }}
        className={`rounded-full h-full px-4 p-2 flex items-center gap-2`}
      >
        <div>{label}</div>

        <div
          style={{
            borderColor: activeTheme[200],
          }}
          className="border-l h-full p-0"
        />

        <div className="relative">
          <div className={`h-5 w-5 flex items-center justify-center transition-all duration-150 ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <ChevronDown />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute mt-1 top-full left-0 origin-top-right w-fit bg-white shadow-xl border rounded-lg overflow-hidden divide-y [&>div]:px-4 [&>div]:py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="shortcuts-menu"
          tabIndex={-1}
        >
          {children
            ? children
            : options &&
              options.map((option) => (
                <div
                  key={option}
                  className="hover:bg-primary-50 px-4 py-2 whitespace-nowrap "
                  onClick={() => {
                    // setSelectedOption(option);
                    onSelect && onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
