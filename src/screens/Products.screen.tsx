import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductsList";
import { ProductProvider, useProduct } from "../contexts/Product.context";
import { ProductType } from "../types";
import useSound from "../hooks/useSound";

function ProductEdit({ product }: { product: ProductType }) {
  const { playBeep } = useSound();
  const { state } = useProduct();
  const [productSelected, setProductSelected] = useState(product ? product : state.products[0]);

  const getInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    let VALUE: string | boolean;
    VALUE = value ? value : checked;
    setProductSelected({ ...productSelected, [name]: VALUE });
  };

  const saveEdit = () => {
    alert(JSON.stringify(productSelected));
  };

  useEffect(() => {
    playBeep();
    if (product) setProductSelected(product);
  }, [product]);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="w-full flex flex-col gap-4">
        <div className="aspect-square w-auto h-40">
          <img src={productSelected.image} className="w-auto h-full rounded-md" />
        </div>
        <div className="gap-2 flex-col flex">
          <div className="flex gap-2 items-center bg-gray-100 rounded-md px-2">
            <label htmlFor="name" className="w-16">
              Nom:
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              placeholder="Nom du produit"
              value={productSelected.name}
              onChange={getInputData}
              className="w-full p-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="flex gap-2 items-center bg-gray-100 rounded-md px-2">
            <label htmlFor="price" className="w-16">
              Prix:
            </label>
            <input
              type="number"
              id="productPrice"
              name="price"
              placeholder="Prix du produit"
              value={productSelected.price}
              onChange={getInputData}
              className="w-full p-2 bg-gray-100 rounded-md"
            />
          </div>

          <div className="flex gap-2 items-center bg-gray-100 rounded-md px-2">
            <label htmlFor="unite" className="w-16">
              Unité:
            </label>
            <input
              type="text"
              id="productUnit"
              name="unite"
              placeholder="Unité"
              value={productSelected.unite}
              onChange={getInputData}
              className="w-full p-2 bg-gray-100 rounded-md"
            />
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" name="isActive" checked={productSelected.isActive} onChange={getInputData} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            <span className="ms-3 text-sm font-medium">Afficher le produit</span>
          </label>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" name="priceDemi" checked={productSelected.priceDemi} onChange={getInputData} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            <span className="ms-3 text-sm font-medium">Prix moitié</span>
          </label>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <button onClick={saveEdit} className="w-full rounded-md p-2 bg-green-500">
          ENREGISTRER
        </button>
        <button className="w-full rounded-md p-2 bg-red-500">SUPPRIMER LE PRODUIT</button>
      </div>
    </div>
  );
}

function ProductsScreen() {
  const [productSelected, setProductSelected] = useState<any>();

  return (
    <ProductProvider>
      <div className="w-full h-full overflow-hidden flex gap-3">
        <div className="grid grid-cols-7 gap-2 pb-1 h-full w-full overflow-scroll">
          <ProductList handleClick={setProductSelected} />
        </div>

        <div className="h-full w-1/3 bg-white border rounded-md p-3">
          <ProductEdit product={productSelected} />
        </div>
      </div>
    </ProductProvider>
  );
}

export default ProductsScreen;
