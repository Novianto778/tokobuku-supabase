import PieChart from "components/charts/PieChart";
import { useState } from "react";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Customer Data</h1>
      <div className="grid grid-cols-2 gap-x-8">
        <div className="p-8 bg-white shadow">
          <div className="relative w-32 mb-6">
            <input
              type="number"
              id="floating_filled"
              className="block px-2.5 pb-2.5 pt-5 w-full text-sm peer border-2"
              defaultValue={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
            <label
              htmlFor="floating_filled"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Year
            </label>
          </div>
          <PieChart />
        </div>
        <div>
          <p>Grid item 2</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
