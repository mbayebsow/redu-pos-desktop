interface SelectFieldProps {
  variant?: "tonal" | "outlined";
  label: string;
  name: string;
  optionsData: any[];
  value: string;
  optionsValue: string;
  optionsText: string;
  defaultText: string;
  defaultTextValue: string;
  onChange?: (event: any) => void;
}

function SelectField({
  variant = "tonal",
  label,
  name,
  value,
  optionsData,
  optionsValue,
  optionsText,
  defaultText,
  defaultTextValue,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="p-[2px] h-10 w-fit">
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
        <div className="rounded-lg">
          <select
            onChange={onChange}
            value={value}
            name={name}
            className="w-22 h-full bg-transparent pr-2"
          >
            <option value={defaultTextValue}>{defaultText}</option>

            {optionsData.map((option, i) => (
              <option key={i} value={option[optionsValue]}>
                {option[optionsText]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectField;
