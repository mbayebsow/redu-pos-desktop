import { ReactNode } from "react";

interface ChipsProps {
  text: string;
  icon: ReactNode;
  handleClick?: (param: any) => any;
}

function Chips({ text, icon, handleClick }: ChipsProps) {
  return (
    <button
      onClick={handleClick}
      className="bg-primary-100 text-sm rounded-full h-9 w-fit flex gap-2 px-3 items-center hover:bg-primary-50"
    >
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
      <hr className="border-primary-900 w-1" />
      <div className="whitespace-nowrap w-fit font-light">{text}</div>
    </button>
  );
}

export default Chips;
