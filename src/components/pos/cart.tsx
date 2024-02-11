import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../../contexts/cart-context";
import ClientSelect from "../client/client-select";

export default function Cart() {
  const { cartProducts, cartClient, clearCart, adjustQuantity, addClient } = useCart();

  return (
    <>
      <div className="w-full flex flex-col h-full overflow-hidden">
        <div className="h-fit p-2 text-center flex justify-between border-b border-primary-50 mb-3">
          <div className="relative flex items-center gap-1">
            <ShoppingBag size={20} />
            <div className="text-center bg-primary-100 rounded-full w-5 h-5 text-xs p-0 leading-5">
              {cartProducts.length}
            </div>
          </div>

          <div onClick={clearCart} className="relative">
            <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 overflow-auto">
          {cartProducts.length === 0 && (
            <div className="h-full w-full p-4 opacity-25 select-none flex items-center justify-center">
              <ShoppingCart size={100} />
            </div>
          )}

          <div className="flex-1 w-full overflow-auto ">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="select-none w-full flex items-center justify-between py-2 border-b"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 bg-white mr-2 rounded-md"
                />
                <div className="flex-grow">
                  <h5 className="text-xs text-blue-gray-900 line-clamp-1">{product.name}</h5>
                  <p className="text-sm block text-blue-gray-900">
                    {product.quantity} * {product.price}
                  </p>
                </div>

                <div className="py-1 h-fit">
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => adjustQuantity(product, "de")}
                      className="h-5 w-5 rounded-full flex justify-center items-center bg-primary-100"
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      onClick={() => adjustQuantity(product, "in")}
                      className="h-5 w-5 rounded-full flex justify-center items-center bg-primary-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="">
            <ClientSelect value={cartClient?.id} onChange={addClient} />
          </div>
        </div>
      </div>
    </>
  );
}
