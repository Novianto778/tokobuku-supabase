import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "components/ui/Datatable";
import { transaction_columns } from "constants/datatable/transaction";
import { PortalWithState } from "react-portal";
import ModalTableCustomer from "components/modal/ModalTableCustomer";
import { fetchCustomer } from "store/customerSlice";
import ModalTableProduct from "components/modal/ModalTableProduct";

const Transaction = () => {
  const { transaction, selectedCustomer } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  const memoizedTransactionColumns = React.useMemo(() => {
    return transaction_columns;
  }, []);
  const currentDate = moment(new Date()).format("DD/MM/YYYY");
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

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
            defaultValue={userData?.username}
            className="border-gray-200 border-2 text-sm px-2 py-0.5"
          />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">Customer</p>
          <input
            type="text"
            disabled
            className="border-gray-200 border-2 text-sm px-2 py-0.5"
            value={selectedCustomer?.name || ""}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <PortalWithState
            closeOnOutsideClick
            closeOnEsc
            node={document && document.getElementById("modal-root")}
          >
            {({ openPortal, isOpen, portal, closePortal }) => {
              return (
                <>
                  <button
                    onClick={openPortal}
                    className="px-4 text-sm py-2 bg-blue-500 text-white font-semibold rounded"
                  >
                    Add Product
                  </button>

                  {isOpen && (
                    <div className="bg-gray-400 opacity-50 z-20 w-screen h-screen absolute top-0 left-0"></div>
                  )}
                  {portal(<ModalTableProduct closePortal={closePortal} />)}
                </>
              );
            }}
          </PortalWithState>
          <PortalWithState
            closeOnOutsideClick
            closeOnEsc
            node={document && document.getElementById("modal-root")}
          >
            {({ openPortal, isOpen, portal, closePortal }) => {
              return (
                <>
                  <button
                    onClick={openPortal}
                    className="px-4 text-sm py-2 bg-primary text-white font-semibold rounded"
                  >
                    Cari Customer
                  </button>

                  {isOpen && (
                    <div className="bg-gray-400 opacity-50 z-20 w-screen h-screen absolute top-0 left-0"></div>
                  )}
                  {portal(<ModalTableCustomer closePortal={closePortal} />)}
                </>
              );
            }}
          </PortalWithState>
        </div>
      </div>
      <div className="mt-6">
        <Datatable
          height={300}
          className="datagrid"
          rows={transaction}
          // loading={pending}
          components={{
            NoRowsOverlay: CustomOverlay,
          }}
          columns={memoizedTransactionColumns}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
      </div>
    </>
  );
};

export default Transaction;

const CustomOverlay = () => (
  <div className="flex w-full h-full items-center justify-center">
    <p className="text-center font-medium">There is no transaction</p>
  </div>
);
