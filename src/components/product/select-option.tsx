import useTheme from "../../stores/theme";
import { numberWithCommas } from "../../utils";
import { ProductOptionType } from "../../utils/types";

interface SelectOptionProps {
  options: ProductOptionType[] | null;
  onSelectOption: (identifier: string) => void;
}

function SelectOption({ options, onSelectOption }: SelectOptionProps) {
  const { activeTheme } = useTheme();
  return (
    <div className="relative w-full h-full overflow-y-scroll">
      <div className="grid grid-cols-2 gap-2 h-fit w-full">
        {options &&
          options.map((option, i) => (
            <div
              key={i}
              style={{ backgroundColor: activeTheme[200] }}
              onClick={() => onSelectOption(option.identifier)}
              className="p-2 w-full rounded-lg cursor-pointer"
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
