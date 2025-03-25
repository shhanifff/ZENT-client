import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import { ProductProvider } from "../Pages/ProductContext";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const { allProducts, allUsers } = useContext(ProductProvider);
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const totalProducts = allProducts.length;
  const totalUsers = allUsers.length;

  useEffect(() => {
    axios.get("http://localhost:3000/api/totalOrders").then((res) => {
      setOrdersData(res.data.data);

      const total = res.data.data.reduce(
        (acc, item) => acc + item.products.length,
        0
      );
      setTotalOrders(total);
    });
  }, []);

  const generateChartData = () => {
    if (!ordersData.length) return { labels: [], datasets: [] };

    const filteredOrders = ordersData.filter((order) => {
      const date = new Date(order.orderDate);
      return (
        (!selectedMonth || date.getMonth() + 1 === parseInt(selectedMonth)) &&
        (!selectedYear || date.getFullYear() === parseInt(selectedYear))
      );
    });

    const revenueByDate = filteredOrders.reduce((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.Total_Amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(revenueByDate),
      datasets: [
        {
          label: "Revenue by Date",
          data: Object.values(revenueByDate),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap gap-8 justify-evenly py-6 px-6 md:px-12">
        {[
          {
            label: "Total Products",
            count: totalProducts,
            icon: "bx-box",
            color: "indigo",
          },
          {
            label: "Total Users",
            count: totalUsers - 1,
            icon: "bx-user",
            color: "green",
          },
          {
            label: "Total Orders",
            count: totalOrders,
            icon: "bx-cart",
            color: "red",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-44 md:w-56 lg:w-64 h-48 bg-white shadow-lg rounded-xl flex justify-center items-center flex-col gap-4 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <i
              className={`bx ${item.icon} text-4xl text-${item.color}-600`}
            ></i>
            <h1 className="font-semibold text-xl text-gray-700">
              {item.label}
            </h1>
            <p className="text-2xl font-bold text-gray-800">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-3/4 mx-auto p-6 bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Revenue by Date
          </h2>
          <div className="flex gap-4">
            {[
              {
                value: selectedMonth,
                setValue: setSelectedMonth,
                options: months,
                label: "All Months",
              },
              {
                value: selectedYear,
                setValue: setSelectedYear,
                options: years,
                label: "All Years",
              },
            ].map((filter, idx) => (
              <select
                key={idx}
                value={filter.value}
                onChange={(e) => filter.setValue(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-gray-700"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value || opt} value={opt.value || opt}>
                    {opt.label || opt}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
        <Bar
          data={generateChartData()}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Revenue (₹)" },
              },
              x: { title: { display: true, text: "Date" } },
            },
          }}
        />
      </div>
    </>
  );
}

export default Dashboard;
