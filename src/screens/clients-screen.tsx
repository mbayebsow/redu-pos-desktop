import Table from "../components/ui/data-table";
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
  const { clients, selectedClient, setSelectedClient } = useClient();
  //selectedClient?.id === client.id
  return <Table handleClick={setSelectedClient} columns={columns} data={clients} />;
}

function ClientDetails() {
  const { selectedClient } = useClient();

  return (
    selectedClient && (
      <div>
        <div className="flex gap-0 bg-primary-100 rounded-md">
          <div className=" p-2">
            <div className="aspect-square bg-primary-200 rounded-full fill-primary-800 p-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </div>
          </div>
          <div className="w-full p-2">
            <div>
              <div>{selectedClient.firstName} </div>
              <div>{selectedClient.lastName} </div>
              <div>{selectedClient.address} </div>
              <div>{selectedClient.phone} </div>
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
      <div className="flex gap-2 w-full">
        <div className="w-full h-full overflow-y-scroll">
          <div className="py-2 flex justify-between gap-2 w-full ">
            <div className="rounded-lg overflow-hidden h-fit border border-primary-light  bg-primary-50">
              <input type="text" name="search" placeholder="Recherche" className="w-full px-2 py-1" />
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => null /*setOpentAddModal(true)*/}
                className="w-full rounded-lg px-5 bg-primary-800 text-primary-50 whitespace-nowrap"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="w-full h-full overflow-y-scroll py-2">
            <div className="h-fit w-full relative">
              <CLientsList />
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full rounded-xl bg-white border border-primary-light p-3 bg-primary-50">
          <ClientDetails />
        </div>
      </div>
    </ClientProvider>
  );
}

export default ClientsScreen;
