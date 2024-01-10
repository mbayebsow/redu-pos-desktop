interface TestFieldProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ label, placeholder, name, type, value, onChange }: TestFieldProps) {
  return (
    <div className="flex gap-2 items-center rounded-lg px-3 bg-primary-100">
      <label htmlFor="name" className="w-16 text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-primary-100 border-b border-primary-700"
      />
    </div>
  );
}

export default TextField;
