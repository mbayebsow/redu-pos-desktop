interface TextFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  type: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ label, placeholder, name, type, value, onChange }: TextFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor="name" className="ml-1 text-sm mb-2">
        {label}
      </label>
      <div className="rounded-lg ">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-primary-100 focus:shadow-lg border border-primary-200"
        />
      </div>
    </div>
  );
}

export default TextField;
