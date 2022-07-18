import React from "react";
import { useParams } from "react-router-dom";
import book from "assets/img/book.png";

const Detail = () => {
  const params = useParams();
  console.log(params.id);
  const cekStatus = (stock) => {
    if (stock <= 10) return "bg-[#FFE1E7] text-[#D9697D]";
    if (stock > 10 && stock < 50) return "bg-yellow-100 text-yellow-600";
    if (stock > 50) return "bg-[#D0F4E8] text-[#23A17A]";
  };
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Book Detail</h1>
      <div className="flex gap-x-8">
        <div className="flex-1 border-2 border-yellow-400 border-dashed max-h-[400px] rounded-md">
          <img src={book} className="h-full p-10 mx-auto" alt="" />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-semibold tracking-wide">Buku Pelajaran</p>
          <p className="font-bold text-xl text-primary tracking-wider">
            Atomic Habits
          </p>
          <p className="font-medium">James Clear, 2017</p>
          <div className="mt-6">
            <p>Price: Rp 50.000</p>
            <p className="mt-2">
              Stock:{" "}
              <span
                className={`cellWithStatus w-16 inline-block text-center py-0.5 rounded-full font-medium ${cekStatus(
                  52
                )} `}
              >
                52
              </span>
            </p>
            <p className="mt-2">Discount: 20%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
