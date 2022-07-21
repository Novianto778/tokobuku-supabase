import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { fetchBook } from "store/bookSlice";
import { book_columns } from "constants/datatable";
import { supabase } from "services/supabaseClient";
import { useState } from "react";
import DeleteModal from "pages/Book/DeleteModal";
import FlashMessage from "components/ui/FlashMessage";
import Datatable from "components/ui/Datatable";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

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

  const handleExportXLSX = () => {
    const newBookData = book.map((item) => {
      const {
        created_at,
        updated_at,
        deleted_at,
        book_category_id,
        book_category: {name_category},
        slug,
        cover,
        ...rest
      } = item;
      return {...rest, name_category}
    })
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(newBookData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "book.xlsx");
  };

  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["TITLE", "AUTHOR"]];

    const data = book.map((elt) => [elt.title, elt.author]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

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
      <div className="flex gap-x-8 items-center mb-2">
        <Link
          to="add"
          className="px-6 py-1 bg-primary text-white rounded-md inline-block"
        >
          Add Book
        </Link>
        <button
          onClick={handleExportPDF}
          className="px-6 py-0.5 bg-white border-2 border-primary rounded-md hover:bg-primary hover:text-white duration-200"
        >
          Export PDF
        </button>
        <button
          onClick={handleExportXLSX}
          className="px-6 py-0.5 bg-white border-2 border-primary rounded-md hover:bg-primary hover:text-white duration-200"
        >
          Export Excel
        </button>
      </div>
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
