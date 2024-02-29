import { formatISODate } from "../../../utils";
import { SalesType, TableColumns } from "../../../utils/types";
import useUserStore from "../../../stores/users";

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

export const salesListCulumns: TableColumns = [
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
];
