import { GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCustomer } from "store/salesSlice";

export const customer_columns = [
  {
    field: "id",
    headerName: "No",
    headerAlign: "left",
    width: 80,
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "left",
    minWidth: 160,
    flex: 1,
  },
  {
    field: "no_customer",
    headerName: "No Customer",
    headerAlign: "left",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "left",
    width: 130,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    headerAlign: "left",
    width: 90,
    align: "left",
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
    getActions: (params) => [<SelectCustomerButton params={params} />],
  },
];

const SelectCustomerButton = ({ params }) => {
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const selectCustomer = useCallback(
    (id) => {
      return [...customer].find((row) => row.id !== id);
    },
    [customer]
  );
  return (
    <div
      className="border-2 border-gray-600 rounded flex items-center px-2 py-0.5 cursor-pointer"
      onClick={() =>
        dispatch(setSelectedCustomer(selectCustomer(params.row.id)))
      }
    >
      <GridActionsCellItem
        icon={<AiOutlineSelect className="text-lg" fill="black" />}
        label="Select"
      />
      <span className="text-sm ml-2">Select</span>
    </div>
  );
};
