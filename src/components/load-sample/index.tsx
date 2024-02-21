import toast from "react-hot-toast";
import Button from "../ui/button";
import { useState } from "react";
import { DownloadCloud } from "lucide-react";
import generateData from "../../lib/generateData";

function LoadSample() {
  const [loading, setLoading] = useState<boolean>(false);

  const loadsampleData = async () => {
    setLoading(true);

    generateData();

    toast.success("Succès");
    window.location.reload();

    setLoading(false);
  };

  return (
    <div className="w-fit">
      <Button
        loading={loading}
        separator
        roundedBorder="full"
        variant="danger"
        text="Load sample"
        handleClick={loadsampleData}
        icon={<DownloadCloud />}
      />
    </div>
  );
}

export default LoadSample;
