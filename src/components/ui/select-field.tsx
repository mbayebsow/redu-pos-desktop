interface SelectFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  options: Array<any>;
  defaultValue?: string;
  onChange?: (event: any) => void;
}

function SelectField({ label, placeholder, name, options, defaultValue, onChange }: SelectFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor="name" className="ml-1 text-sm mb-2">
        {label}
      </label>
      <div className="rounded-lg ">
        <select
          onChange={onChange}
          defaultValue={defaultValue ? defaultValue : "null"}
          name={name}
          className="w-full p-2 rounded-lg bg-primary-100 focus:shadow-lg border border-primary-200"
        >
          <option disabled value="null">
            {placeholder}
          </option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
