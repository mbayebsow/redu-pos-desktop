import { getMinMax, numberWithCommas } from "../../lib";
import { ProductsWithOptionsType } from "../../lib/types";

interface ProductCardProps {
  values: ProductsWithOptionsType;
  handleClick: (product: ProductsWithOptionsType) => void;
}

function ProductCard({ handleClick, values }: ProductCardProps) {
  const { name, price, type, options, image } = values;

  return (
    <div
      onClick={() => handleClick(values)}
      className="rounded-xl p-1 h-fit w-full  productItem cursor-pointer overflow-hidden hover:border hover:shadow-lg"
    >
      <div className="overflow-hidden aspect-square rounded-lg relative">
        <img src={image} alt={name} className="h-full w-full object-cover bg-primary-100" />
        <p className="text-xs font-semibold absolute bottom-0 px-2 py-1 bg-primary-50/50 w-full">
          {type === "standard"
            ? numberWithCommas(price)
            : type === "variable" && options && getMinMax(options, "priceSale", null, true)}
        </p>
      </div>

      <div className="p-2">
        <p className="line-clamp-2 text-xs">{name}</p>
      </div>
    </div>
  );
}

export default ProductCard;
