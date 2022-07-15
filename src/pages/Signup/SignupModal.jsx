import React from "react";

const SignupModal = ({email, setOpenModal}) => {
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full  md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex justify-between items-start p-4 rounded-t border-b">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Account Created
            </h3>
            <button
            onClick={() => setOpenModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              We have sent email to{" "}
              <span className="text-yellow-400">{email}</span> to confirm
              the validity of your email address. After receiving the email,
              follow the link provided to complete your registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
