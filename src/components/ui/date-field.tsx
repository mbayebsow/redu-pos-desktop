import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

interface DateFieldProps {
  label?: string;
  variant?: "tonal" | "outlined";
  roundedBorder?: "lg" | "full";
  onSelect: (date: Date) => void;
}

const options: IOptions = {
  autoHide: false,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white",
    todayBtn: "bg-primary-800 border-none",
    clearBtn: "",
    icons: "",
    text: "bg-primary-100 m-0.5 rounded-md",
    disabledText: "bg-transparent m-0.5",
    input:
      "bg-transparent border-none h-full p-1  rounded-full appearance-none focus:outline-none focus:ring-0",
    inputIcon: "hidden",
    selected: "bg-primary-800 text-primary-50",
  },
  icons: {
    prev: () => <ArrowLeft />,
    next: () => <ArrowRight />,
  },
  defaultDate: new Date(),
  language: "fr",
  disabledDates: [],
  weekDays: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

function DateField({ label, roundedBorder = "full", variant = "tonal", onSelect }: DateFieldProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="p-[2px] h-10 w-full">
      <div
        className={`
          relative w-full h-full px-4 pr-3 flex items-center z-50 gap-2
          ${roundedBorder === "lg" && "rounded-lg"}
          ${roundedBorder === "full" && "rounded-full"}
          ${variant === "tonal" && "bg-primary-100/50"} 
          ${variant === "outlined" && "bg-white"} 
        `}
      >
        <label className="text-gray-500 whitespace-nowrap border-r border-black/20 pr-2 text-xs">
          {label}
        </label>
        <DatePicker
          options={options}
          show={show}
          setShow={() => setShow(!show)}
          onChange={(date) => onSelect(date)}
        />
      </div>
    </div>
  );
}

export default DateField;
