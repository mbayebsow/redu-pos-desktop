import { getMinMax, numberWithCommas } from "../../lib";
import { ProductsWithOptionsType } from "../../lib/types";

interface ProductCardProps {
  values: ProductsWithOptionsType;
  handleClick: (product: ProductsWithOptionsType) => void;
}

function ProductCard({ handleClick, values }: ProductCardProps) {
  const { name, priceSale, type, options, image } = values;

  return (
    <div
      onClick={() => handleClick(values)}
      className="h-fit w-full productItem cursor-pointer overflow-hidden rounded-md border-red-500 hover:border-2 hover:shadow-lg"
    >
      <div className="overflow-hidden aspect-square relative">
        <img src={image} alt={name} className="h-full w-full object-cover bg-primary-100" />
        <div className="absolute bottom-0 px-2 py-1 bg-primary-50/50 w-full">
          <p className="line-clamp-2 text-xs text-black">{name}</p>
          <p className="text-xs font-semibold hidden">
            {type === "standard"
              ? numberWithCommas(priceSale)
              : type === "variable" && options && getMinMax(options, "priceSale", null, true)}
          </p>
        </div>
      </div>

      <div className="p-2 hidden">
        <p className="line-clamp-2 text-xs">{name}</p>
      </div>
    </div>
  );
}

export default ProductCard;
