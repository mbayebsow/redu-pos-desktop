import { ChangeEvent, memo } from "react";
import useTheme from "../../stores/theme";

interface SelectFieldProps {
  variant?: "tonal" | "outlined";
  roundedBorder?: "lg" | "full";
  label: string;
  name: string;
  value: string | number | null;
  optionsData: any[];
  optionsValue?: string;
  optionsText?: string;
  optionsText2?: string;
  defaultText?: string;
  defaultTextValue?: string;
  render?: (record?: any) => string | number;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = memo(
  ({
    variant = "tonal",
    label,
    name,
    value,
    roundedBorder = "full",
    optionsData,
    optionsValue,
    optionsText,
    optionsText2,
    render,
    defaultText,
    defaultTextValue,
    onChange,
  }: SelectFieldProps) => {
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
            w-full flex items-center gap-2 px-4 h-full py-2
            ${roundedBorder === "lg" && "rounded-lg"}
            ${roundedBorder === "full" && "rounded-full"}
          `}
        >
          <label htmlFor={name} className="text-gray-500 pr-2 text-xs">
            {label}
          </label>

          <div className="border-l border-black/10 h-full p-0" />

          <div className="rounded-lg w-full">
            <select
              onChange={onChange}
              value={value ? value : ""}
              name={name}
              className="h-full w-full bg-transparent pr-2 appearance-none focus:outline-none focus:ring-0"
            >
              {defaultText && <option value={defaultTextValue}>{defaultText}</option>}

              {optionsData.map((option, i) => (
                <option key={i} value={optionsValue ? option[optionsValue] : option}>
                  {render ? render(option) : optionsText ? option[optionsText] : option}
                  {optionsText2 && option[optionsText2]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
);

export default SelectField;
