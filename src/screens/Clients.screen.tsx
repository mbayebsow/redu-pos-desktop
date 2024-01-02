import { ClientProvider, useClient } from "../contexts/Client.context";

function CLientsList() {
  const { clients } = useClient();

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
            <tr className="odd:bg-white even:bg-gray-100 border-b">
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

function ClientsScreen() {
  return (
    <ClientProvider>
      <div className="flex gap-3 w-full">
        <div className="w-full h-full overflow-y-scroll border rounded-md">
          <CLientsList />
        </div>
        <div className="w-1/3 h-full rounded-md bg-white border"></div>
      </div>
    </ClientProvider>
  );
}

export default ClientsScreen;
