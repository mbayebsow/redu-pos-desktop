import { formatISODate } from "../../utils";
import { SalesType, TableColumns } from "../../utils/types";
import useUserStore from "../../stores/users";
import { memo } from "react";
import Button from "../ui/button";
import { LayoutList, Pen } from "lucide-react";

const ClientFullName = ({ record }: { record: SalesType }) => {
  const getUserById = useUserStore((state) => state.getUserById);

  return (
    record.customer && (
      <div>
        {getUserById(record.customer)?.data?.firstName} {getUserById(record.customer)?.data?.lastName}
      </div>
    )
  );
};

const SaleOptions = memo<{ identifier: string }>(({ identifier }) => {
  return (
    <div className="w-fit inline-flex gap-2 items-center">
      <Button variant="icon" icon={<Pen />} />
      <Button variant="icon" icon={<LayoutList />} />
    </div>
  );
});

export const salePageCulumns: TableColumns = [
  {
    title: "Produits",
    dataIndex: "itemsNumbers",
  },
  {
    title: "Montant total",
    dataIndex: "amount",
  },
  {
    title: "Montant reçu",
    dataIndex: "advance",
  },
  {
    title: "Client",
    dataIndex: "customer",
    render: (record: SalesType) => <ClientFullName record={record} />,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (record: SalesType) => <div>{formatISODate(record.date)}</div>,
  },
  {
    title: "Options",
    dataIndex: "date",
    render: (record) => <SaleOptions identifier={record.identifier} />,
  },
];
