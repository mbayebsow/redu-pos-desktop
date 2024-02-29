import { memo } from "react";

function SectionTitle({ children }: { children: string }) {
  return <div className="text-3xl font-bold p-2">{children}</div>;
}

export default memo(SectionTitle);
