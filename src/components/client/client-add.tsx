import { ChangeEvent, useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import { CustomerType } from "../../lib/types";
import TextField from "../ui/text-field";
import { useClient } from "../../contexts/client-context";

const initialClient = {
  id: 0,
  firstName: "",
  lastName: "",
  address: "",
  phone: 77,
  mail: "",
  isActive: true,
};

interface ClientFormProps {
  clientState: CustomerType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const ClientForm = ({ clientState, handleChange }: ClientFormProps) => {
  return (
    <div className="p-2 w-full">
      <div className="mb-5 ml-2 text-xl font-bold">Ajouter un client</div>
      <div className="flex flex-col gap-2 w-full">
        <TextField
          type="text"
          label="Prenom"
          name="firstName"
          value={clientState.firstName}
          onChange={handleChange}
        />
        <TextField
          type="text"
          label="Nom"
          name="lastName"
          value={clientState.lastName}
          onChange={handleChange}
        />
        <TextField
          type="number"
          label="Telephone"
          name="phone"
          value={clientState.phone}
          onChange={handleChange}
        />
        <TextField
          type="text"
          label="Adresse"
          name="address"
          value={clientState.address}
          onChange={handleChange}
        />
        <TextField
          type="mail"
          label="Email"
          name="mail"
          value={clientState.mail}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

function AddClient() {
  const [openaddModal, setOpenaddModal] = useState(false);
  const [clientState, setClientState] = useState<CustomerType>(initialClient);
  const { addClient } = useClient();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setClientState({ ...clientState, [name]: value });
    console.log(clientState);
  };

  return (
    <div className="">
      <Modal
        showModal={openaddModal}
        setShowModal={setOpenaddModal}
        actionButtonShow
        actionButtonText="Ajouter"
        actionButtonOnClick={() => {
          addClient(clientState);
          setClientState(initialClient);
        }}
        content={<ClientForm clientState={clientState} handleChange={handleChange} />}
      />
      <Button roundedBorder="full" handleClick={() => setOpenaddModal(true)} text="Ajouter" />
    </div>
  );
}
export default AddClient;
