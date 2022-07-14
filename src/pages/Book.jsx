import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { fetchBook } from "store/bookSlice";
import { book_columns } from "constants/datatable";
import { supabase } from "services/supabaseClient";
import { useState } from "react";
import DeleteModal from "components/DeleteModal";
import FlashMessage from "components/FlashMessage";
import Datatable from "components/Datatable";

const Book = () => {
  const { showDeleteModal } = useSelector((state) => state.modal);
  const { pending } = useSelector((state) => state.book);
  const { book } = useSelector((state) => state.book);
  const [payloadTimestamp, setPayloadTimestamp] = useState("");
  const [payloadEvent, setPayloadEvent] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const dispatch = useDispatch();

  supabase
    .from("book")
    .on("*", (payload) => {
      setPayloadTimestamp(payload.commit_timestamp);
      setPayloadEvent(payload.eventType);
    })
    .subscribe();

  useEffect(() => {
    // const fetchBookCover = async () => {
    //   const { data, error } = await supabase.storage.from("cover").list();
    //   console.log(data)
    // };
    // fetchBookCover()
    dispatch(fetchBook());
    if (payloadTimestamp) setShowFlashMessage(true);
    const timer = setTimeout(() => {
      setShowFlashMessage(false);
      // setPayloadTimestamp("")
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, payloadTimestamp]);
  return (
    <>
      {showDeleteModal && <DeleteModal selectedId={selectedId} />}
      <h1 className="text-xl font-bold mb-2">Data Buku</h1>
      {showFlashMessage && payloadEvent === "DELETE" && (
        <FlashMessage
          type={payloadEvent.toLowerCase()}
          message="Book deleted successfully"
        />
      )}

      <Datatable
        onSelectionModelChange={(selectionModel) => {
          setSelectedId(selectionModel[0]);
        }}
        className="datagrid"
        rows={book}
        loading={pending}
        columns={book_columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </>
  );
};

export default memo(Book);

Book.whyDidYouRender = true;
