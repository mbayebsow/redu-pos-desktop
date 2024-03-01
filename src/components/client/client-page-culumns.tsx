import { Pen, Send } from "lucide-react";
import { memo } from "react";
import Button from "../ui/button";

const ClientOptions = memo<{ clientId: number }>(({ clientId }) => {
  return (
    <div className="w-fit inline-flex gap-2 items-center">
      <Button variant="icon" icon={<Send />} />
      <Button variant="icon" icon={<Pen />} />
    </div>
  );
});

export const clientsColumns = [
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
  {
    title: "Options",
    render(record) {
      return <ClientOptions clientId={record.id} />;
    },
  },
];
