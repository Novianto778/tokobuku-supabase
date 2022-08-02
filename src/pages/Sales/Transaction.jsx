import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "components/ui/Datatable";
import { transaction_columns } from "constants/datatable/transaction";
import { PortalWithState } from "react-portal";
import ModalTableCustomer from "components/modal/ModalTableCustomer";
import { fetchCustomer } from "store/customerSlice";
import ModalTableProduct from "components/modal/ModalTableProduct";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { insertTable } from "services/supabaseFunction";
import { resetCustomer, resetTransaction } from "store/salesSlice";

const Transaction = () => {
  const [subTotalTransaction, setSubTotalTransaction] = useState(0);
  const [nominal, setNominal] = useState(null);
  const [change, setChange] = useState(null);
  const { transaction, selectedCustomer } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  const memoizedTransactionColumns = React.useMemo(() => {
    return transaction_columns;
  }, []);
  const currentDate = moment(new Date()).format("DD/MM/YYYY");
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCustomer());
    function calcTotal() {
      const total = transaction.reduce(
        (a, b) => a + b.price * (1 - b.discount) * b.qty,
        0
      );
      return total;
    }
    setSubTotalTransaction(calcTotal());
  }, [dispatch, transaction]);

  const handleResetTransaction = () => {
    setChange(null);
    setSubTotalTransaction(0);
    setNominal(null);
    dispatch(resetTransaction());
    dispatch(resetCustomer());
  };

  const handlePayment = async () => {
    if (!selectedCustomer) {
      Swal.fire({
        icon: "error",
        title: "There is no customer",
        text: "Please select customer first!",
      });
      return;
    }

    if (+nominal >= +subTotalTransaction) {
      Swal.fire({
        icon: "success",
        title: "Payment Success",
        text: "Your payment has been successful!",
      });
      const sale_id = uuidv4();
      const transactionData = {
        id: sale_id,
        user_id: userData?.id,
        customer_id: selectedCustomer?.id,
      };

      const transactionDetail = transaction.map((item) => {
        return {
          sale_id,
          book_id: item.id,
          amount: item.qty,
          price: item.price,
          discount: item.discount,
          total_price: item.price * (1 - item.discount) * item.qty,
        };
      });

      await insertTable("sale", transactionData);
      await insertTable("sale_detail", transactionDetail);

      setChange(+nominal - +subTotalTransaction);
      setSubTotalTransaction(0);
      setNominal(null);
      dispatch(resetTransaction());
      dispatch(resetCustomer());
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "The nominal is not enough!",
      });
    }
  };

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
      <div className="mt-4 flex gap-8 py-8">
        <div className="flex-1">
          <p>Total Bayar</p>
          <h2 className="font-bold text-3xl mt-4">Rp. {subTotalTransaction}</h2>
        </div>
        <div className="flex-1">
          <div className="mb-4 grid-cols-5 grid items-center">
            <label htmlFor="nominal" className="col-span-2">
              Nominal
            </label>
            <input
              type="number"
              name="nominal"
              className="border-2 border-gray-300 px-4 py-2 text-lg font-semibold col-span-3"
              onInput={(e) => setNominal(e.target.value)}
              value={nominal || 0}
            />
          </div>
          <div className="mb-4 grid-cols-5 grid items-center">
            <label htmlFor="nominal" className="col-span-2">
              Change
            </label>
            <input
              type="text"
              name="change"
              className="border-2 border-gray-300 px-4 py-2 text-lg font-semibold bg-gray-400 col-span-3"
              disabled
              value={change || ""}
            />
          </div>
          <div className="flex gap-x-4 justify-center">
            <button
              className="px-4 text-sm py-2 bg-green-500 text-white font-semibold rounded"
              onClick={handlePayment}
            >
              Payment Process
            </button>
            <button className="px-4 text-sm py-2 bg-blue-500 text-white font-semibold rounded" onClick={handleResetTransaction}>
              New Transaction
            </button>
          </div>
        </div>
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
