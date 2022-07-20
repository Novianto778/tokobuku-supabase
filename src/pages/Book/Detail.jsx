import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchBook } from "store/bookSlice";
import { downloadImage } from "services/supabaseFunction";

const Detail = () => {
  const [cover, setCover] = useState("");
  const [currentBook, setCurrentBook] = useState(null);
  const { book } = useSelector((state) => state.book);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (book.length === 0) dispatch(fetchBook());
    const bookDetail = book.find((item) => item.id === +id);
    setCurrentBook(bookDetail);
  }, [book, dispatch, id]);

  useEffect(() => {
    if (currentBook?.cover) downloadImage("cover", currentBook.cover, setCover);
  }, [currentBook?.cover]);
  const cekStatus = (stock) => {
    if (stock <= 10) return "bg-[#FFE1E7] text-[#D9697D]";
    if (stock > 10 && stock < 50) return "bg-yellow-100 text-yellow-600";
    if (stock > 50) return "bg-[#D0F4E8] text-[#23A17A]";
  };
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Book Detail</h1>
      {currentBook ? (
        <div className="flex gap-x-8">
          <div className="flex-1 border-2 border-yellow-400 border-dashed max-h-[400px] rounded-md">
            <img src={cover} className="h-full p-10 mx-auto" alt="" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm font-semibold tracking-wide">
                {currentBook.book_category.name_category}
              </p>
              <p className="font-bold text-xl text-primary tracking-wider">
                {currentBook.title}
              </p>
              <p className="font-medium">James Clear, 2017</p>
              <div className="mt-6">
                <p>Price: Rp {currentBook.price}</p>
                <p className="mt-2">
                  Stock:{" "}
                  <span
                    className={`cellWithStatus w-16 inline-block text-center py-0.5 rounded-full font-medium ${cekStatus(
                      currentBook.stock
                    )} `}
                  >
                    {currentBook.stock}
                  </span>
                </p>
                <p className="mt-2">Discount: {currentBook.discount * 100}%</p>
              </div>
            </div>
            <div className="flex gap-x-6">
              <Link to={`/dashboard/book/edit/${id}`} className="px-8 py-2 bg-yellow-400 rounded-md">
                Edit
              </Link>
              <button className="px-8 py-2 bg-red-500 text-white rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Detail;
