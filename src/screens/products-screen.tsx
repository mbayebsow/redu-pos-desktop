import { useEffect, useState } from "react";
import ProductList from "../components/product/products-list";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { ProductType } from "../types";
import useSound from "../hooks/useSound";
import TextField from "../components/ui/text-field";

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
          <TextField type="text" label="Nom:" name="name" placeholder="Nom du produit" value={productSelected.name} onChange={getInputData} />
          <TextField type="number" label="Prix:" name="price" placeholder="Prix du produit" value={productSelected.price} onChange={getInputData} />
          <TextField type="text" label="Unité:" name="unite" placeholder="Unité" value={productSelected.unite} onChange={getInputData} />

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
        <button onClick={saveEdit} className="w-full rounded-lg p-2 bg-primary-800 text-primary-50">
          Enregister
        </button>
        <button className="w-full rounded-lg p-2 bg-primary-100 border border-primary-200">Supprimer</button>
      </div>
    </div>
  );
}

function ProductsScreen() {
  const [productSelected, setProductSelected] = useState<any>();

  return (
    <ProductProvider>
      <div className="w-full h-full overflow-hidden flex gap-2">
        <div className="w-full bg-primary-50 border border-primary-light p-2 rounded-xl">
          <div className="py-2 flex justify-between gap-2 w-full border-b border-b-primary-light">
            <div className="rounded-lg overflow-hidden h-fit">
              <input
                type="text"
                name="search"
                placeholder="Recherche"
                value=""
                // onChange={onChange}
                className="w-full bg-primary-100 px-2 py-1 border-b border-primary-200"
              />
            </div>
            <div className="flex gap-1">
              <button className="w-full rounded-lg px-5 bg-primary-100  border border-primary-200 whitespace-nowrap">Prix: Tout</button>
              <button className="w-full rounded-lg px-5 bg-primary-100  border border-primary-200 whitespace-nowrap">Visibilité: Tout</button>
              <button className="w-full rounded-lg px-5 bg-primary-800 text-primary-50 whitespace-nowrap">Ajouter</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 pb-1 h-full w-full overflow-scroll rounded-xl pt-2">
            <ProductList handleClick={setProductSelected} />
          </div>
        </div>

        <div className="h-full w-1/3 bg-primary-50 border border-primary-light rounded-xl p-3">
          <ProductEdit product={productSelected} />
        </div>
      </div>
    </ProductProvider>
  );
}

export default ProductsScreen;
