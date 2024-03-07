import { ReactNode, memo, useId } from "react";
import useTheme from "../../stores/theme";

interface TextFieldProps {
  label?: string | ReactNode;
  name: string;
  type: string;
  value?: string | number;
  variant?: "tonal" | "outlined";
  roundedBorder?: "lg" | "full";
  placeholder?: string;
  clrearValue?: (arg: any | undefined) => any | void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = memo(
  ({ label, name, type, value, placeholder, roundedBorder = "full", variant = "tonal", clrearValue, onChange }: TextFieldProps) => {
    const id = useId();
    const { activeTheme } = useTheme();
    return (
      <div className="p-[2px] h-10 w-full">
        <div
          style={{
            backgroundColor: variant === "outlined" ? activeTheme[50] : variant === "tonal" ? activeTheme[100] : "transparent",
            // color: variant === "outlined" ? activeTheme[800] : activeTheme[50],
            borderColor: variant === "outlined" ? activeTheme[50] : activeTheme[100],
          }}
          className={`
          w-full h-full px-4 pr-3 flex items-center
          ${roundedBorder === "lg" && "rounded-lg"}
          ${roundedBorder === "full" && "rounded-full"}
        `}
        >
          <div className="h-full w-full flex items-center gap-2">
            <label htmlFor={id} className="text-gray-500 whitespace-nowrap border-r border-black/20 pr-2 text-xs">
              {label}
            </label>
            <input
              id={id}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className="block w-full h-full bg-transparent appearance-none focus:outline-none focus:ring-0"
            />
          </div>
          <button onClick={clrearValue} className="w-4 h-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <line x1="18" x2="12" y1="9" y2="15" />
              <line x1="12" x2="18" y1="9" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

export default TextField;
