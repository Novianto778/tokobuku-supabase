import { MdDashboard } from "react-icons/md";
import { AiOutlineBook } from "react-icons/ai";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        icon: <MdDashboard className="w-6 h-6" />,
        link: "/dashboard",
      },
      {
        name: "Data Buku",
        icon: <AiOutlineBook className="w-6 h-6" />,
        link: "/book",
      },
    ],
  },
  {
    title: "Transaksi",
    links: [
      {
        name: "Dashboard",
        icon: <MdDashboard className="w-6 h-6" />,
        link: "/book",
      },
      {
        name: "Data Buku",
        icon: <AiOutlineBook className="w-6 h-6" />,
        link: "/book",
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
