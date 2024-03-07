import { ReactNode } from "react";
import useTheme from "../../stores/theme";

interface ChipsProps {
  text: string;
  icon?: ReactNode;
  active?: boolean;
  handleClick?: (param: any) => any;
}

function Chips({ text, icon, active = false, handleClick }: ChipsProps) {
  const { activeTheme } = useTheme();
  return (
    <button
      style={{ backgroundColor: active ? activeTheme[500] : activeTheme[50], color: active ? activeTheme[50] : "" }}
      onClick={handleClick}
      className={`rounded-full h-fit w-fit flex gap-1 px-1 py-0.5 pr-3 items-center`}
    >
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
      <hr className="border-black/30 w-1" />
      <div className="whitespace-nowrap w-fit">{text}</div>
    </button>
  );
}

export default Chips;
