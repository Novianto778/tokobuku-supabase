import Datatable from "components/ui/Datatable";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { customer_columns } from "constants/datatable/customer";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const ModalTableCustomer = ({ closePortal }) => {
  const memoizedColumn = useMemo(() => customer_columns, []);
  const { customer, pending } = useSelector((state) => state.customer);
  return (
    <>
      <div className="px-8 absolute left-1/2 top-1/2 w-10/12 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white shadow-lg rounded-md">
        <div className="flex justify-between items-center pt-4 px-4">
          <h2 className="text-lg font-semibold">Table Customer</h2>
          <AiOutlineClose
            className="text-lg cursor-pointer"
            onClick={closePortal}
          />
        </div>
        <div className="p-4">
          <Datatable
            height={400}
            rows={customer}
            loading={pending}
            columns={memoizedColumn}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
    </>
  );
};

export default ModalTableCustomer;
