import { MdDashboard } from "react-icons/md";
import { AiOutlineBook, AiOutlineShoppingCart } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        icon: <MdDashboard className="w-6 h-6" />,
        link: "/dashboard/app",
      },
      {
        name: "Data Buku",
        icon: <AiOutlineBook className="w-6 h-6" />,
        link: "/dashboard/book",
      },
    ],
  },
  {
    title: "Transaksi",
    links: [
      {
        name: "Sales",
        icon: <GiProgression className="w-6 h-6" />,
        link: "/sales",
        subLinks: [
          { name: "Transaction", link: "/sales/transaction" },
          { name: "Report", link: "/sales/report" },
        ],
      },
      {
        name: "Purchases",
        icon: <AiOutlineShoppingCart className="w-6 h-6" />,
        link: "/purchases",
        subLinks: [
          { name: "Transaction", link: "/purchases/transaction" },
          { name: "Report", link: "/purchases/report" },
        ],
      },
    ],
  },
  // {
  //   title: 'Pages',
  //   links: [
  //     {
  //       name: 'orders',
  //       icon: <AiOutlineShoppingCart />,
  //     },
  //     {
  //       name: 'employees',
  //       icon: <IoMdContacts />,
  //     },
  //     {
  //       name: 'customers',
  //       icon: <RiContactsLine />,
  //     },
  //   ],
  // },
];
