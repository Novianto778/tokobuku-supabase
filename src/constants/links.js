import { MdDashboard } from "react-icons/md";
import { AiOutlineBook, AiOutlineShoppingCart } from "react-icons/ai";
import {GiProgression} from "react-icons/gi";

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
        name: "Sales",
        icon: <GiProgression className="w-6 h-6" />,
        link: "/sales",
      },
      {
        name: "Purchases",
        icon: <AiOutlineShoppingCart className="w-6 h-6" />,
        link: "/purchases",
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
