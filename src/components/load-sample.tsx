import toast from "react-hot-toast";
import Button from "./ui/button";
import { PRODUCT_DB, CUSTOMERS_DB, CATEGORIES_DB } from "../lib/db";
import { useState } from "react";
import { DownloadCloud } from "lucide-react";

function LoadSample() {
  const [loading, setLoading] = useState<boolean>(false);

  const loadsampleData = async () => {
    setLoading(true);

    const products = await fetch("https://my.api.mockaroo.com/products.json?key=39fd0fb0", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => {
        toast.error("Erreur de recuperation des produits");
        console.log(err);
        return;
      });

    const categories = await fetch("https://my.api.mockaroo.com/categories.json?key=39fd0fb0", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => {
        toast.error("Erreur de recuperation des produits");
        console.log(err);
        return;
      });

    const customers = await fetch("https://my.api.mockaroo.com/customers.json?key=39fd0fb0", {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((err) => {
        toast.error("Erreur de recuperation des produits");
        console.log(err);
        return;
      });

    if (PRODUCT_DB.getAll()?.length === 0) PRODUCT_DB.addBatch(products);
    if (CATEGORIES_DB.getAll()?.length === 0) CATEGORIES_DB.addBatch(categories);
    if (CUSTOMERS_DB.getAll()?.length === 0) CUSTOMERS_DB.addBatch(customers);

    toast.success("Succès");
    window.location.reload();

    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      separator
      roundedBorder="full"
      variant="danger"
      text="Load sample"
      handleClick={loadsampleData}
      icon={<DownloadCloud />}
    />
  );
}

export default LoadSample;
