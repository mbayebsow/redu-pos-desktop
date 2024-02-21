import { Dispatch, SetStateAction } from "react";
import { SupplierType } from "../../lib/types";
import TextField from "../ui/text-field";

interface SupplierAddProps {
  supplier: SupplierType;
  setSupplier: Dispatch<SetStateAction<SupplierType>>;
}
function SupplierAdd({ supplier, setSupplier }: SupplierAddProps) {
  return (
    <div className="w-fit h-fit">
      <div className="p-3 text-xl font-bold w-2/3">Ajouter un nouveau fournisseur</div>
      <div className="p-2 flex flex-col gap-2">
        <TextField
          name="name"
          label="Nom"
          type="text"
          value={supplier.name}
          onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
          clrearValue={() => setSupplier({ ...supplier, name: "" })}
        />
        <TextField
          name="phone"
          label="Telephone"
          type="number"
          value={supplier.phone}
          onChange={(e) => setSupplier({ ...supplier, phone: Number(e.target.value) })}
          clrearValue={() => setSupplier({ ...supplier, phone: 7 })}
        />
        <TextField
          name="adress"
          label="Adresse"
          type="text"
          value={supplier.address}
          onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
          clrearValue={() => setSupplier({ ...supplier, address: "" })}
        />
      </div>
    </div>
  );
}

export default SupplierAdd;
