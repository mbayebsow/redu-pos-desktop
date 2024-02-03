import { ClientProvider, useClient } from "../../contexts/client-context";

interface ClientSelectPros {
  onChange: (id: number) => void;
}

function Main({ onChange }: ClientSelectPros) {
  const { clients } = useClient();

  return (
    <select
      onChange={(v) => onChange(Number(v.target.value))}
      defaultValue="message"
      name="clientCart"
      id="clientCart"
      className="w-full rounded-lg p-1 bg-primary-200 h-9 px-2 border border-primary-light"
    >
      <option disabled value="message">
        Client
      </option>
      {clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.firstName} {client.lastName}
        </option>
      ))}
    </select>
  );
}

function ClientSelect({ onChange }: ClientSelectPros) {
  return (
    <ClientProvider>
      <Main onChange={onChange} />
    </ClientProvider>
  );
}

export default ClientSelect;
