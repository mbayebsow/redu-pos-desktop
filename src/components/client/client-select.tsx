import { ClientProvider, useClient } from "../../contexts/client-context";

interface ClientSelectPros {
  value: any;
  onChange: (id: number) => void;
}

function Main({ value, onChange }: ClientSelectPros) {
  const { clients } = useClient();

  return (
    <select
      onChange={(v) => onChange(Number(v.target.value))}
      value={value ? value.toString() : "0"}
      name="clientCart"
      id="clientCart"
      className="w-full rounded-lg p-1 bg-primary-200 h-9 px-2 border border-primary-light"
    >
      <option disabled value="0">
        Client
      </option>
      {clients &&
        clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.firstName} {client.lastName}
          </option>
        ))}
    </select>
  );
}

function ClientSelect({ value, onChange }: ClientSelectPros) {
  return (
    <ClientProvider>
      <Main value={value} onChange={onChange} />
    </ClientProvider>
  );
}

export default ClientSelect;
