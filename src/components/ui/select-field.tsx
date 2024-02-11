import { ChangeEvent, ReactNode } from "react";

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
  render?: (record?: any) => ReactNode;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
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
}: SelectFieldProps) {
  return (
    <div className="p-[2px] h-10 w-full">
      <div
        className={`
        w-full flex items-center gap-2 px-4 h-full
        ${roundedBorder === "lg" && "rounded-lg"}
        ${roundedBorder === "full" && "rounded-full"}
        ${variant === "tonal" && "bg-primary-100/50 border-primary-200"}
        ${variant === "outlined" && "bg-primary-50 border-primary-100"}
      `}
      >
        <label htmlFor={name} className="text-gray-500 border-r border-black/20 pr-2 text-xs">
          {label}
        </label>
        <div className="rounded-lg w-full">
          <select
            onChange={onChange}
            value={value ? value : ""}
            name={name}
            className="h-full w-full bg-transparent pr-2"
          >
            {defaultText && <option value={defaultTextValue}>{defaultText}</option>}

            {optionsData.map((option, i) => (
              <option key={i} value={optionsValue ? option[optionsValue] : option}>
                {render ? render(option) : optionsText ? option[optionsText] : option}{" "}
                {optionsText2 && option[optionsText2]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectField;
