import { ClientProvider, useClient } from "../contexts/client-context";

function CLientsList() {
  const { clients, selectedClient, setSelectedClient } = useClient();
  // const [selectedClient, setSelectedClient] = useState<ClientType>();

  return (
    <div className="relative overflow-x-auto w-full">
      <table className="w-full relative text-left">
        <thead className="uppercase w-full bg-primary-200 border-b">
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
              className={`odd:bg-primary-50 even:bg-primary-100/50 hover:border cursor-pointer ${
                selectedClient?.id === client.id ? "border" : null
              } `}
            >
              <th scope="row" className="px-6 py-4">
                {client.firstName}
              </th>
              <td className="px-6 py-4">{client.lastName}</td>
              <td className="px-6 py-4">{client.phone}</td>
              <td className="px-6 py-4">{client.address}</td>
              <td className="px-6 py-4 flex items-center gap-2">
                <button className="font-medium text-red-600 fill-primary-800 w-8 h-8 bg-primary-100 p-2 rounded-full">
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
                <button className="font-medium text-red-600 fill-primary-800 w-8 h-8 bg-primary-100 p-2 rounded-full">
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
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
        <div className="w-full h-full overflow-y-scroll border border-primary-light rounded-xl overflow-hidden bg-primary-50">
          <CLientsList />
        </div>
        <div className="w-2/5 h-full rounded-xl bg-white border border-primary-light p-3 bg-primary-50">
          <ClientDetails />
        </div>
      </div>
    </ClientProvider>
  );
}

export default ClientsScreen;
