import ProductList from "../components/product/ProductList";
import { ProductProvider } from "../contexts/ProductContext";

function Root() {
  const click = (p: any) => {
    console.log(p);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <ProductProvider>
        <div className="grid grid-cols-10 gap-2 pb-1">
          <ProductList handleClick={click} />
        </div>
      </ProductProvider>
    </div>
  );
}

export default Root;
