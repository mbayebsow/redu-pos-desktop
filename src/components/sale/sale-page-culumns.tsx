import { formatISODate } from "../../utils";
import { SalesType, TableColumns } from "../../utils/types";
import useUserStore from "../../stores/users";
import { memo } from "react";
import ProductsListButton from "./products-list-button";
import SaleEditButton from "./sale-edit-button";

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

const SaleOptions = memo<{ saleId: number }>(({ saleId }) => {
  return (
    <div className="w-fit inline-flex gap-2 items-center">
      <SaleEditButton saleId={saleId} />
      <ProductsListButton saleId={saleId} />
    </div>
  );
});

export const salePageCulumns: TableColumns = [
  {
    title: "NO",
    dataIndex: "receiptNo",
  },
  {
    title: "Produits",
    dataIndex: "itemsNumbers",
  },
  {
    title: "Montant",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "advance",
    render(record: SalesType) {
      return (
        <div className="flex items-center gap-2">
          <div
            className={`${record.amount - record.advance > 0 ? "bg-red-500" : record.amount - record.advance <= 0 && "bg-green-500"} rounded-full w-3 h-3`}
          />
          <div>{record.amount - record.advance > 0 ? "Partiel" : record.amount - record.advance <= 0 && "Complet"}</div>
        </div>
      );
    },
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
    render: (record: SalesType) => <SaleOptions saleId={record.id} />,
  },
];
