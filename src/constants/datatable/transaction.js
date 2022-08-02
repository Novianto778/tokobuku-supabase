import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteTransaction, updateQtyProduct } from "store/salesSlice";
import { useCallback, useEffect } from "react";

export const transaction_columns = [
  { field: "id", headerName: "ID", headerAlign: "left", width: 80, hide: true },
  {
    field: "no",
    headerName: "No",
    tyoe: "number",
    headerAlign: "center",
    width: 80,
    align: "center",
  },
  {
    field: "title",
    headerName: "Product",
    headerAlign: "left",
    width: 180,
    flex: 1,
  },
  {
    field: "qty",
    headerName: "Quantity",
    type: "number",
    headerAlign: "center",
    width: 80,
    align: "center",
    editable: true,
    renderCell: (params) => {
      return <QtyCell params={params} />;
    },
  },
  {
    field: "price",
    headerName: "Unit Price",
    type: "number",
    headerAlign: "left",
    minWidth: 120,
    flex: 0.5,
    align: "left",
    valueFormatter: (params) => {
      return `Rp ${params.value}`;
    },
  },
  {
    field: "discount",
    headerName: "Discount",
    type: "number",
    headerAlign: "left",
    width: 110,
    align: "left",
    valueGetter: (params) => {
      // console.log(params)
      return `Rp ${params.row.price * params.value * params.row.qty}`;
    },
  },
  {
    field: "subtotal",
    headerName: "Subtotal",
    type: "number",
    headerAlign: "left",
    minWidth: 120,
    flex: 0.5,
    align: "left",
    valueGetter: (params) => {
      return `Rp ${
        (params.row.price - params.row.price * params.row.discount) *
        params.row.qty
      }`;
    },
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "right",
    minWidth: 240,
    sortable: false,
    align: "right",
    flex: 1,
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<AiOutlineEdit className="text-lg" />}
        onClick={() => console.log(params.row.id)}
        label="Edit"
      />,
      <DeleteTransactionButton params={params} />,
    ],
  },
];

const DeleteTransactionButton = ({ params }) => {
  const { transaction } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  const deleteRow = useCallback(
    (id) => {
      return [...transaction].filter((row) => row.id !== id);
    },
    [transaction]
  );
  return (
    <GridActionsCellItem
      icon={<FiTrash className="text-lg" />}
      onClick={() => dispatch(deleteTransaction(deleteRow(params.row.id)))}
      label="Delete"
    />
  );
};

const QtyCell = ({ params }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateQtyProduct({ id: params.row.id, qty: params.value }));
  }, [params.value]);
  return <span>{params.value}</span>;
};
