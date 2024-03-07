import { memo, useCallback } from "react";
import { Minus, Percent, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import useCartStore from "../../stores/cart";
import useUserStore from "../../stores/users";
import useTheme from "../../stores/theme";

function CartLenght() {
  const { activeTheme } = useTheme();
  const cartProducts = useCartStore((state) => state.cartProducts);
  return (
    <div className="relative flex items-center gap-1">
      <ShoppingBag size={20} />
      <div
        style={{
          backgroundColor: activeTheme[100],
        }}
        className="text-center rounded-full w-5 h-5 text-xs p-0 leading-5"
      >
        {cartProducts.length}
      </div>
    </div>
  );
}

function CartClear() {
  const clearCart = useCartStore((state) => state.clearCart);
  return (
    <div onClick={clearCart} className="relative">
      <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
        <Trash2 size={20} />
      </button>
    </div>
  );
}

const ClientSelectClient = memo(function ClientSelectClient() {
  const { activeTheme } = useTheme();
  const clients = useUserStore((state) => state.users);
  const cartClient = useCartStore((state) => state.cartClient);
  const addClient = useCartStore(useCallback((state) => state.addClient, []));

  return (
    <div className="p-2 w-full">
      <select
        style={{
          backgroundColor: activeTheme[100],
        }}
        onChange={(v) => addClient(Number(v.target.value))}
        value={cartClient ? cartClient : "0"}
        name="clientCart"
        id="clientCart"
        className="w-full rounded-lg p-1 h-9 px-2"
      >
        <option disabled value="0">
          Client
        </option>
        {clients &&
          clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName}
            </option>
          ))}
      </select>
    </div>
  );
});

function CartProductsList() {
  const { activeTheme } = useTheme();
  const cartProducts = useCartStore((state) => state.cartProducts);
  const adjustQuantity = useCartStore((state) => state.adjustQuantity);

  return (
    <div className="h-full w-full overflow-y-scroll divide-y divide-black/5">
      {cartProducts.length === 0 && (
        <div className="h-full w-full p-4 opacity-25 select-none flex items-center justify-center">
          <ShoppingCart size={100} />
        </div>
      )}
      {cartProducts.map((product) => (
        <div key={product.identifier} className="select-none w-full flex items-center justify-between p-1 pl-2">
          <img src={product.productImage} alt={product.productName} className="h-10 w-10 bg-white mr-2 rounded-md" />
          <div className="flex-grow">
            <div className="text-xs line-clamp-1">{product.productName}</div>
            <div className="text-[10px] opacity-70 line-clamp-1 -mt-1">Reduction: {product.discount}</div>
            <p className="text-xs block text-blue-gray-900">
              {product.quantity} * {product.price}
            </p>
          </div>

          <div className="py-1 h-fit w-fit flex gap-1">
            <div>
              <button onClick={() => null} className="h-5 w-5 rounded-full flex justify-center items-center bg-yellow-300">
                <Percent size={11} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-between gap-1 w-full">
              <button
                onClick={() => adjustQuantity(product, "in")}
                style={{
                  backgroundColor: activeTheme[100],
                }}
                className="h-5 w-5 rounded-full flex justify-center items-center"
              >
                <Plus size={13} />
              </button>
              <button
                onClick={() => adjustQuantity(product, "de")}
                style={{
                  backgroundColor: activeTheme[100],
                }}
                className="h-5 w-5 rounded-full flex justify-center items-center"
              >
                <Minus size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Cart() {
  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="h-fit p-2 text-center flex justify-between mb-3">
        <CartLenght />
        <CartClear />
      </div>

      <div className="flex flex-col gap-1 h-full overflow-hidden">
        <CartProductsList />
        <ClientSelectClient />
      </div>
    </div>
  );
}
