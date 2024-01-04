import { ClientProvider, useClient } from "../../contexts/Client.context";

interface ClientSelectPros {
  onChange: (id: number) => void;
}

function Select({ onChange }: ClientSelectPros) {
  const { clients } = useClient();

  return (
    <select
      onChange={(v) => onChange(Number(v.target.value))}
      defaultValue="message"
      name="clientCart"
      id="clientCart"
      className="w-full rounded-md p-1 bg-white/20 text-white"
    >
      <option disabled value="message">
        -- Choisir --
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
      <Select onChange={onChange} />
    </ClientProvider>
  );
}

export default ClientSelect;
