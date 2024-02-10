interface UploadFieldProps {
  label: string;
  labelDescription?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UplaodField({ label, name, labelDescription, onChange }: UploadFieldProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full border border-primary-200 border-dashed rounded-lg cursor-pointer bg-primary-100 hover:bg-primary-200"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-sm text-gray-500">
            <span className="font-semibold"> {label} </span>
          </p>
          <p className="text-xs text-gray-500"> {labelDescription}</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
          accept="image/png, image/jpeg"
        />
      </label>
    </div>
  );
}

export default UplaodField;
