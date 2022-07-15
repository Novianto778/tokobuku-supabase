import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookById } from "store/bookSlice";
import { hideModal } from "store/modalSlice";
import LoadingCircle from "../../components/ui/LoadingCircle";

const DeleteModal = ({ selectedId }) => {
  const { deleting } = useSelector((state) => state.book);
  const { selectedBookTitle } = useSelector((state) => state.modal);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    setIsDelete(true);
    dispatch(deleteBookById(id));
  };
  useEffect(() => {
    if (!deleting && isDelete) dispatch(hideModal());
  }, [deleting, isDelete, dispatch]);

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative pb-6 px-4 rounded-lg shadow bg-primary">
          <button
            onClick={() => dispatch(hideModal())}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete "{selectedBookTitle}"?
            </h3>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleDeleteBook(selectedId)}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              {deleting ? <LoadingCircle /> : "Yes, I'm sure"}
            </button>
            <button
              onClick={() => dispatch(hideModal())}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
