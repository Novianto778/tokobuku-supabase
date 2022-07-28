import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { downloadImage } from "services/supabaseFunction";
import { addTransaction } from "store/salesSlice";

export const product_columns = [
  {
    field: "id",
    headerName: "id",
    headerAlign: "left",
    width: 80,
    align: "center",
    hide: true,
  },
  {
    field: "no",
    headerName: "No",
    headerAlign: "center",
    width: 60,
    align: "center",
  },
  {
    field: "cover",
    headerName: "Cover",
    headerAlign: "left",
    minWidth: 160,
    flex: 1,
    renderCell: (params) => <ProductCover params={params} />,
  },
  {
    field: "title",
    headerName: "Title",
    headerAlign: "left",
    width: 150,
  },
  {
    field: "release_year",
    headerName: "Release Year",
    headerAlign: "left",
    width: 130,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    headerAlign: "left",
    width: 90,
    align: "left",
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    headerAlign: "left",
    width: 80,
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
    getActions: (params) => [<AddProductButton params={params} />],
  },
];

const AddProductButton = ({ params }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="border-2 border-gray-600 rounded flex items-center px-2 py-0.5 cursor-pointer"
      onClick={() => dispatch(addTransaction(params.row))}
    >
      <GridActionsCellItem
        icon={<BsCartPlus className="text-lg" fill="black" />}
        label="Select"
      />
      <span className="text-sm ml-2">Add</span>
    </div>
  );
};

const ProductCover = ({ params }) => {
  const [cover, setCover] = useState("");
  useEffect(() => {
    downloadImage("cover", params.value, setCover);
  }, [params.value]);
  return (
    <div className="p-4">
      <img src={cover} alt="book cover" className="max-w-[100px]" />
    </div>
  );
};
