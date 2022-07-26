import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Datatable from "components/ui/Datatable";
import { transaction_columns } from "constants/datatable";

const Transaction = () => {
  const { transaction } = useSelector((state) => state.sales);
  const memoizedTransactionColumns = React.useMemo(() => {
    return transaction_columns;
  }, []);
  const currentDate = moment(new Date()).format("DD/MM/YYYY");
  const { userData } = useSelector((state) => state.user);

  
  return (
    <>
      <h1 className="text-xl font-semibold">Sales</h1>
      <div className="grid grid-cols-4 gap-x-4 mt-4">
        <div>
          <p className="text-sm font-semibold mb-1">Tanggal</p>
          <input
            type="text"
            disabled
            defaultValue={currentDate}
            className="border-gray-200 border-2 text-sm px-2 py-0.5"
          />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">User</p>
          <input
            type="text"
            disabled
            defaultValue={userData.username}
            className="border-gray-200 border-2 text-sm px-2 py-0.5"
          />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">Customer</p>
          <input
            type="text"
            disabled
            className="border-gray-200 border-2 text-sm px-2 py-0.5"
          />
        </div>
        <div className="flex items-center gap-x-4">
          <button className="px-4 text-sm py-2 text-white bg-blue-500 font-semibold rounded">
            Pilih Produk
          </button>
          <button className="px-4 text-sm py-2 bg-primary text-white font-semibold rounded">
            Cari Customer
          </button>
        </div>
      </div>
      <div className="mt-6">
        <Datatable
          height={280}
          className="datagrid"
          rows={transaction}
          // loading={pending}
          columns={memoizedTransactionColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default Transaction;
