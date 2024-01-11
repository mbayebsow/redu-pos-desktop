interface SwitchFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SwitchField({ label, name, checked, onChange }: SwitchFieldProps) {
  return (
    <label className="inline-flex items-center bg-primary-100 w-fit p-2 pr-4 rounded-lg border border-primary-200">
      <div className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-primary-200 border border-primary-light peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary-500 peer-checked:after:bg-primary-50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        <span className="ms-3">{label}</span>
      </div>
    </label>
  );
}

export default SwitchField;
