import { ReactNode } from "react";

interface ChipsProps {
  text: string;
  icon?: ReactNode;
  active?: boolean;
  handleClick?: (param: any) => any;
}

function Chips({ text, icon, active = false, handleClick }: ChipsProps) {
  return (
    <button
      onClick={handleClick}
      className={` ${active && "bg-primary-500 text-primary-50 border-none"} border border-primary-200 rounded-full h-fit w-fit flex gap-1 px-1 py-0.5 pr-3 items-center`}
    >
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
      <hr className="border-primary-500 w-1" />
      <div className="whitespace-nowrap w-fit">{text}</div>
    </button>
  );
}

export default Chips;
