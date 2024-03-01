import { ReactNode, memo } from "react";
import { playBeep } from "../../utils/interactive-sound";

interface ButtonPros {
  text?: string;
  icon?: ReactNode;
  children?: string;
  separator?: boolean;
  loading?: boolean;
  variant?: "filled" | "tonal" | "outlined" | "text" | "icon";
  roundedBorder?: "normal" | "full";
  handleClick?: (params: any | null) => any;
}

const Button = memo(
  ({ text, icon, children, roundedBorder = "normal", separator = false, loading = false, variant = "filled", handleClick }: ButtonPros) => {
    return (
      <button
        onClick={(params) => {
          if (handleClick) {
            handleClick(params);
            playBeep();
          }
        }}
        className={`${roundedBorder === "normal" && "rounded-lg"} ${roundedBorder === "full" && "rounded-full"} ${variant === "icon" ? "w-10" : "w-fit"} p-[2px] overflow-hidden relative z-10  flex w-full h-10  items-center gap-2 justify-center`}
      >
        {loading && (
          <div
            className={`${variant === "filled" ? "to-primary-300" : variant === "tonal" ? "to-primary-800" : variant === "text" && "to-primary-800"} animate-spin bg-gradient-to-r from-transparent via-transparent w-full h-full absolute top-0 bottom-0 left-0 right-0 -z-10`}
          />
        )}

        <div
          className={`
        ${variant === "filled" && "bg-primary-800 text-primary-50 fill-primary-50 px-4 py-2"} 
        ${variant === "tonal" && "bg-primary-100/50 text-primary-800 fill-primary-800 px-4 py-2 border border-primary-200"}
        ${variant === "text" && "bg-transparent p-2"}
        ${variant === "icon" && "bg-transparent p-2 rounded-full"}
        ${roundedBorder === "normal" && "rounded-lg"}
        ${roundedBorder === "full" && "rounded-full"}
        w-full h-full flex justify-between items-center z-10`}
        >
          <div className="flex items-center gap-3 h-full">
            {icon && <div className={` w-5 h-5 flex items-center justify-center`}>{icon}</div>}
            {separator && (
              <div className={`border-l ${variant === "filled" ? "border-primary-500" : variant === "tonal" && "border-primary-200"} h-full p-1`} />
            )}
          </div>

          {(text || children) && <div className={`whitespace-nowrap w-full`}>{children ? children : text}</div>}
        </div>
      </button>
    );
  }
);

export default Button;
