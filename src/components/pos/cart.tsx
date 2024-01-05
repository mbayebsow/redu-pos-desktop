import { useCart } from "../../contexts/cart-context";
import ClientSelect from "../client/client-select";

export default function Cart() {
  const { cartProducts, clearCart, adjustQty, addClient } = useCart();

  return (
    <>
      <div className="rounded-lg w-1/4 flex flex-col h-full bg-white shadow overflow-hidden">
        <div className="h-16 text-center flex justify-center border-b mb-3">
          <div className="pl-8 text-left text-lg py-4 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div className="text-center absolute bg-red-600 rounded-full text-white w-5 h-5 text-xs p-0 leading-5 -right-2 top-3">
              {cartProducts.length}
            </div>
          </div>

          <div onClick={clearCart} className="flex-grow px-8 text-right text-lg py-4 relative">
            <button className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          {cartProducts.length === 0 && (
            <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          )}

          <div className="flex-1 w-full px-2 overflow-auto">
            {cartProducts.map((product) => (
              <div key={product.id} className="rounded-md select-none w-full text-blue-gray-700 flex justify-center py-1 px-1 shadow mb-2">
                <img src={product.image} alt={product.name} className="h-10 w-10 bg-white mr-2 rounded-md" />
                <div className="flex-grow">
                  <h5 className="text-xs text-blue-gray-900">{product.name}</h5>
                  <p className="text-sm block text-blue-gray-900">
                    {product.qty} * {product.price}
                  </p>
                </div>

                <div className="py-1">
                  <div className="flex flex-row gap-2">
                    <button onClick={() => adjustQty(product, "de")} className="w-7 rounded-md text-center py-1 text-white bg-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                      </svg>
                    </button>
                    <button onClick={() => adjustQty(product, "in")} className="w-7 rounded-md text-center py-1 text-white bg-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-zinc-700 flex gap-3 p-2 items-center">
            <label htmlFor="clientCart" className="text-white font-bold">
              CLIENT:
            </label>

            <ClientSelect onChange={addClient} />
          </div>
        </div>
      </div>
    </>
  );
}
