import Button from "../components/ui/button";
import Table from "../components/ui/data-table";
import TextField from "../components/ui/text-field";
import { ClientProvider, useClient } from "../contexts/client-context";

const columns = [
  {
    title: "Prenom",
    dataIndex: "firstName",
  },
  {
    title: "Nom",
    dataIndex: "lastName",
  },
  {
    title: "Telepohne",
    dataIndex: "phone",
  },
  {
    title: "Addresse",
    dataIndex: "address",
  },
];

function CLientsList() {
  const { clients, setSelectedClient } = useClient();
  //selectedClient?.id === client.id
  return <Table handleClick={setSelectedClient} columns={columns} data={clients} />;
}

function ClientDetails() {
  const { selectedClient } = useClient();

  return (
    selectedClient && (
      <div>
        <div className="flex gap-0 bg-primary-100 rounded-lg">
          <div className=" p-2">
            <div className="aspect-square bg-primary-200 rounded-full fill-primary-800 p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </div>
          </div>
          <div className="w-full p-2">
            <div>
              <div>Prenom: {selectedClient.firstName} </div>
              <div>Nom: {selectedClient.lastName} </div>
              <div>Adresse: {selectedClient.address} </div>
              <div>Phone: {selectedClient.phone} </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function ClientsScreen() {
  return (
    <ClientProvider>
      <div className="flex gap-2 w-full h-full">
        <div className="w-full h-full overflow-y-scroll flex flex-col gap-2">
          <div className="py-2 flex justify-between gap-2 w-full bg-primary-50 rounded-xl p-2">
            <TextField label="Recherche" type="text" name="search" />
            <div className="flex gap-1">
              <Button text="Ajouter" />
            </div>
          </div>

          <div className="w-full h-full overflow-y-scroll py-2">
            <div className="h-fit w-full relative">
              <CLientsList />
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full bg-primary-50 rounded-xl p-3">
          <ClientDetails />
        </div>
      </div>
    </ClientProvider>
  );
}

export default ClientsScreen;
