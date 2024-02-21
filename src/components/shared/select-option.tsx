import { numberWithCommas } from "../../lib";
import { ProductOptionType } from "../../lib/types";

interface SelectOptionProps {
  options: ProductOptionType[] | null;
  onSelectOption: (identifier: string) => void;
}

function SelectOption({ options, onSelectOption }: SelectOptionProps) {
  return (
    <div className="relative w-full h-full overflow-y-scroll">
      <div className="grid grid-cols-2 gap-2 h-fit w-full">
        {options &&
          options.map((option, i) => (
            <div
              key={i}
              onClick={() => onSelectOption(option.identifier)}
              className="p-2 border-primary-200 bg-primary-100 w-full rounded-lg cursor-pointer"
            >
              <div>{option.name}</div>
              <div className="text-sm">{numberWithCommas(option.priceSale)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SelectOption;
