import useTheme from "../../stores/theme";
import { getMinMax, numberWithCommas } from "../../utils";
import { ProductsWithOptionsType } from "../../utils/types";

interface ProductCardProps {
  values: ProductsWithOptionsType;
  handleClick: (product: ProductsWithOptionsType) => void;
}

function ProductCard({ handleClick, values }: ProductCardProps) {
  const { activeTheme } = useTheme();
  const { name, priceSale, type, options, image } = values;

  return (
    <div
      onClick={() => handleClick(values)}
      className="h-fit w-full productItem cursor-pointer overflow-hidden rounded-md border-red-500 hover:border-2 hover:shadow-lg"
    >
      <div className="overflow-hidden h-fit relative divide-y divide-black/5">
        <img src={image} alt={name} className="h-full w-full object-cover aspect-square bg-primary-100" loading="lazy" />
        <div
          style={{
            backgroundColor: activeTheme[50],
            color: activeTheme[800],
          }}
          className="text-[9px] px-2 py-1 text-white w-full"
        >
          <p className="leading-3">
            {type === "standard" ? numberWithCommas(priceSale) : type === "variable" && options && getMinMax(options, "priceSale", null, true)}
          </p>
          <p className="line-clamp-2 leading-3 text-black">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
