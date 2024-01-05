import { ClientProvider, useClient } from "../contexts/client-context";

function CLientsList() {
  const { clients, selectedClient, setSelectedClient } = useClient();
  // const [selectedClient, setSelectedClient] = useState<ClientType>();

  return (
    <div className="relative overflow-x-auto w-full rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              PreNom
            </th>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Telepohne
            </th>
            <th scope="col" className="px-6 py-3">
              Addresse
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              onClick={() => setSelectedClient(client)}
              className={`odd:bg-white even:bg-gray-100 cursor-pointer ${selectedClient?.id === client.id ? "border-2 border-blue-500" : null} `}
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {client.firstName}
              </th>
              <td className="px-6 py-4">{client.lastName}</td>
              <td className="px-6 py-4">{client.phone}</td>
              <td className="px-6 py-4">{client.address}</td>
              <td className="px-6 py-4 flex items-center gap-3">
                <a href="#" className="font-medium text-blue-600  hover:underline">
                  Modifier
                </a>
                <a href="#" className="font-medium text-red-600 hover:underline">
                  supprimer
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClientDetails() {
  const { selectedClient } = useClient();

  return (
    selectedClient && (
      <div>
        <div className="flex gap-0 bg-gray-100 rounded-md">
          <div className="aspect-square h-20 w-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
              <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
            </svg>
          </div>
          <div className="w-full p-3 border-l">
            <div>
              <div>{selectedClient.firstName} </div>
              <div>{selectedClient.lastName} </div>
              <div>{selectedClient.address} </div>
              <div>{selectedClient.phone} </div>
            </div>
          </div>
        </div>

        <hr className="my-2" />
      </div>
    )
  );
}

function ClientsScreen() {
  return (
    <ClientProvider>
      <div className="flex gap-3 w-full">
        <div className="w-full h-full overflow-y-scroll border rounded-md">
          <CLientsList />
        </div>
        <div className="w-1/3 h-full rounded-md bg-white border p-3">
          <ClientDetails />
        </div>
      </div>
    </ClientProvider>
  );
}

export default ClientsScreen;
