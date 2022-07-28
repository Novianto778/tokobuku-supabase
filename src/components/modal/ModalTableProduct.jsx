import Datatable from "components/ui/Datatable";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { product_columns } from "constants/datatable/product";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "store/bookSlice";

const ModalTableProduct = ({ closePortal }) => {
  const memoizedColumn = useMemo(() => product_columns, []);
  const dispatch = useDispatch();
  const { book, pending } = useSelector((state) => state.book);
  useEffect(() => {
    if (book.length === 0) dispatch(fetchBook());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookRows = book.map((book, index) => {
    return { ...book, no: index + 1 };
  });

  const memoizedRows = useMemo(() => bookRows, [bookRows]);
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
            rows={memoizedRows}
            loading={pending}
            columns={memoizedColumn}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowHeight={() => "auto"}
          />
        </div>
      </div>
    </>
  );
};

export default ModalTableProduct;
