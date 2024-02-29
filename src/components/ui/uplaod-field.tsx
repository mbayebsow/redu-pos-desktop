import { UploadCloud } from "lucide-react";
import { useId } from "react";

interface UploadFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UplaodField({ label, name, value, onChange }: UploadFieldProps) {
  const id = useId();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor={id}
        className="relative overflow-hidden z-0 flex flex-col items-center justify-center w-full h-full border border-primary-200 border-dashed rounded-lg cursor-pointer"
      >
        <img src={value} className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" />
        <div className="flex flex-col items-center justify-center z-10 w-full h-full bg-primary-100/40 hover:bg-black/80 text-white">
          <UploadCloud />
          <p className="text-sm">
            <span className="font-semibold"> {label} </span>
          </p>
        </div>
        <input id={id} type="file" name={name} onChange={onChange} className="hidden" accept="image/png, image/jpeg" />
      </label>
    </div>
  );
}

export default UplaodField;
