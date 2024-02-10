import { ChangeEvent, ReactNode } from "react";

interface SelectFieldProps {
  variant?: "tonal" | "outlined";
  label: string;
  name: string;
  value: string;
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
        w-full flex items-center gap-2 px-2 rounded-lg h-full
        ${variant === "tonal" && "bg-primary-100 border-primary-200"}
        ${variant === "outlined" && "bg-primary-50 border-primary-100"}
      `}
      >
        <label htmlFor={name} className="text-gray-500 border-r border-black/20 pr-2">
          {label}
        </label>
        <div className="rounded-lg w-full">
          <select
            onChange={onChange}
            value={value}
            name={name}
            className="h-full w-full bg-transparent pr-2"
          >
            <option value={defaultTextValue ? defaultTextValue : label}>
              {defaultText ? defaultText : label}
            </option>

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
