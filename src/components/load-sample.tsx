import toast from "react-hot-toast";
import Button from "./ui/button";
import { PRODUCT_DB, CUSTOMERS_DB, CATEGORIES_DB } from "../lib/db";
import { useState } from "react";
import { DownloadCloud } from "lucide-react";
import generateData from "../lib/generateData";


function LoadSample() {
  const [loading, setLoading] = useState<boolean>(false);

  const loadsampleData = async () => {
    setLoading(true);

    generateData()

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
