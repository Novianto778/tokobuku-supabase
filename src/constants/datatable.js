import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalSlice";

export const book_columns = [
  { field: "id", headerName: "ID", headerAlign: "left", width: 80 },
  { field: "title", headerName: "Title", headerAlign: "left", width: 160 },
  { field: "author", headerName: "Author", headerAlign: "left", width: 150 },
  {
    field: "release_year",
    headerName: "Release Year",
    type: "date",
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
    headerAlign: "right",
    width: 160,
    type: "number",
    renderCell: (params) => {
      const cekStatus = (stock) => {
        if (stock < 10) return "bg-[#FFE1E7] text-[#D9697D]";
        if (stock > 10 && stock < 50) return "bg-yellow-100 text-yellow-600";
        if (stock > 50) return "bg-[#D0F4E8] text-[#23A17A]";
      };
      return (
        <div
          className={`cellWithStatus w-16 text-center py-1 rounded-full font-medium ${cekStatus(
            params.row.stock
          )} `}
        >
          {params.row.stock}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "right",
    width: 240,
    sortable: false,
    align: "right",
    renderCell: (params) => {
      return <ActionCols params={params} />;
    },
  },
];

const ActionCols = ({params}) => {
  const dispatch = useDispatch()
  return (
    <div className="cellAction flex flex-wrap gap-x-4">
      <Link
        to="/users/test"
        style={{ textDecoration: "none" }}
        className="group duration-200"
      >
        <div className="px-4 py-1 bg-white border-[1.5px] border-black rounded-md flex items-center">
          <span className="mr-4 group-hover:scale-110 text-white">
            <GrView />
          </span>
          <span className="group-hover:font-semibold">View</span>
        </div>
      </Link>
      <div
        className="px-4 py-1 bg-red-200 hover:bg-red-400 duration-200 rounded-md cursor-pointer flex items-center"
        onClick={() => dispatch(openModal(params.row.title))}
      >
        <span className="mr-4">
          <FiTrash />
        </span>
        <span className="text-black font-medium">Delete</span>
      </div>
    </div>
  );
};

ActionCols.whyDidYouRender = true;
