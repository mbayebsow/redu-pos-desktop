import React, { ReactNode, memo } from "react";

interface CardNumberProps {
  title: string;
  value: number | string;
  prefix?: ReactNode | string;
  suffix?: ReactNode | string;
  styleValue?: React.HTMLAttributes<HTMLStyleElement> | string;
}

function Statistic({ title, value, prefix, suffix, styleValue }: CardNumberProps) {
  return (
    <div className={`w-full p-2`}>
      <div className="text-xs">{title}</div>
      <div>
        <div className={`text-2xl -mt-1 text-right font-bold ${styleValue}`}>{value}</div>
      </div>
    </div>
  );
}
export default memo(Statistic);
