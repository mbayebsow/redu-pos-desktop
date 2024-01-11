import { useEffect, useState } from "react";
import ProductsList from "../components/product/products-list";
import { ProductProvider, useProduct } from "../contexts/product-context";
import { ProductType } from "../types";
import useSound from "../hooks/useSound";
import TextField from "../components/ui/text-field";
import Modal from "../components/ui/modal";
import ProductAdd from "../components/product/product-add";
import SwitchField from "../components/ui/switch-field";

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
        <div className="aspect-square w-auto h-28">
          <img src={productSelected.image} className="w-auto h-full rounded-md" />
        </div>

        <div className="gap-2 flex-col flex h-fit">
          <TextField type="text" label="Nom:" name="name" placeholder="Nom du produit" value={productSelected.name} onChange={getInputData} />
          <div className="inline-flex gap-2 items-center">
            <TextField type="number" label="Prix:" name="price" placeholder="Prix du produit" value={productSelected.price} onChange={getInputData} />
            <TextField type="text" label="Unité:" name="unite" placeholder="Unité" value={productSelected.unite} onChange={getInputData} />
          </div>

          <SwitchField label="Afficher le produit" name="isActive" onChange={getInputData} checked={productSelected.isActive} />
          <SwitchField label="Prix moitié" name="priceDemi" onChange={getInputData} checked={productSelected.priceDemi} />
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
  const [opentAddModal, setOpentAddModal] = useState<boolean>(false);

  return (
    <ProductProvider>
      <Modal showModal={opentAddModal} setShowModal={setOpentAddModal} content={<ProductAdd />} />
      <div className="w-full h-full overflow-hidden flex gap-2">
        <div className="w-full bg-primary-50 border border-primary-light p-2 rounded-xl">
          <div className="py-2 flex justify-between gap-2 w-full border-b border-b-primary-light">
            <div className="rounded-lg overflow-hidden h-fit">
              <input
                type="text"
                name="search"
                placeholder="Recherche"
                //value=""
                // onChange={onChange}
                className="w-full bg-primary-100 px-2 py-1 border-b border-primary-200"
              />
            </div>
            <div className="flex gap-1">
              <button className="w-full rounded-lg px-5 bg-primary-100  border border-primary-200 whitespace-nowrap">Prix: Tout</button>
              <button className="w-full rounded-lg px-5 bg-primary-100  border border-primary-200 whitespace-nowrap">Visibilité: Tout</button>
              <button onClick={() => setOpentAddModal(true)} className="w-full rounded-lg px-5 bg-primary-800 text-primary-50 whitespace-nowrap">
                Ajouter
              </button>
            </div>
          </div>

          <div className="w-full h-full overflow-y-scroll rounded-xl  py-2">
            <div className="grid grid-cols-7 gap-2 h-fit w-full mb-10">
              <ProductsList handleClick={setProductSelected} />
            </div>
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
