import { ReactNode } from "react";

interface ButtonPros {
  text?: string;
  icon?: ReactNode;
  children?: string;
  separator?: boolean;
  loading?: boolean;
  variant?: "filled" | "tonal" | "outlined" | "text" | "danger";
  roundedBorder?: "normal" | "full";
  handleClick?: (params: any | null) => any;
}

function Button({
  text,
  icon,
  children,
  roundedBorder = "normal",
  separator = false,
  loading = false,
  variant = "filled",
  handleClick,
}: ButtonPros) {
  return (
    <button
      onClick={handleClick}
      className={`
        ${roundedBorder === "normal" && "rounded-lg"}
        ${roundedBorder === "full" && "rounded-full"}
        p-[2px] overflow-hidden relative z-10  flex w-fit h-10  items-center gap-2 justify-center`}
    >
      <div
        className={`
        ${(loading && variant) === "filled" && "to-primary-300"} 
        ${(loading && variant) === "tonal" && "to-primary-800"}
        ${(loading && variant) === "text" && "to-primary-800"}
        ${(loading && variant) === "danger" && "to-red-900"}
        ${loading && "animate-spin"}
        bg-gradient-to-r from-transparent via-transparent w-full h-full absolute top-0 bottom-0 left-0 right-0 -z-10`}
      />

      <div
        className={`
        ${variant === "filled" && "bg-primary-800 text-primary-50 fill-primary-50"} 
        ${variant === "tonal" && "bg-primary-100 text-primary-800 fill-primary-800"}
        ${variant === "text" && "bg-transparent"}
        ${variant === "danger" && "bg-red-100 text-red-900 fill-red-900"}
        ${roundedBorder === "normal" && "rounded-lg"}
        ${roundedBorder === "full" && "rounded-full"}
        w-full h-full flex items-center gap-2 justify-center px-3 py-2 z-10`}
      >
        {icon && <div className={`w-4 h-4 flex items-center justify-center`}>{icon}</div>}
        {separator && <hr className="border-primary-900 w-1" />}

        <div className={`whitespace-nowrap w-fit`}>{children ? children : text}</div>
      </div>
    </button>
  );
}

export default Button;
