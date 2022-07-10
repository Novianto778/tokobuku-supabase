import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBook } from "store/bookSlice";

import { book_columns } from "constants/datatable";
import { supabase } from "services/supabaseClient";
import { useState } from "react";
import DeleteModal from "components/DeleteModal";

export default function Book() {
  const { book } = useSelector((state) => state.book);
  const [payloadId, setPayloadId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase
      .from("book")
      .on("DELETE", (payload) => {
        setPayloadId(payload.old.id);
      })
      .subscribe();
    dispatch(fetchBook());
  }, [dispatch, payloadId]);
  return (
    <div className="relative">
      {isModal && <DeleteModal setIsModal={setIsModal} />}
      <h1 className="text-xl font-bold mb-8">Data Buku</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          onSelectionModelChange={(selectionModel) =>
            console.log(selectionModel)
          }
          className="datagrid"
          rows={book}
          columns={book_columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
