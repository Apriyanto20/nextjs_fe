"use client";
import React, { useState, useEffect } from "react";
import { FaWallet, FaUsers, FaUserPlus, FaServer, FaTasks, FaInbox } from "react-icons/fa";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const [userData, setUserData] = useState<number[]>([]);
  const [transactionData, setTransactionData] = useState<number[]>([]);

  useEffect(() => {
    setUserData([50, 75, 100, 125, 150, 175, 200]);
    setTransactionData([30, 45, 80, 90, 120, 140, 160]);
  }, []);

  const metrics = [
    { title: "Total Revenue", value: "$3249", icon: FaWallet, color: "bg-green-600" },
    { title: "Total Users", value: "249", icon: FaUsers, color: "bg-pink-600" },
    { title: "New Users", value: "2", icon: FaUserPlus, color: "bg-yellow-600" },
    { title: "Server Uptime", value: "152 days", icon: FaServer, color: "bg-blue-600" },
    { title: "To Do List", value: "7 tasks", icon: FaTasks, color: "bg-indigo-600" },
    { title: "Issues", value: "3", icon: FaInbox, color: "bg-red-600" },
  ];

  return (
    <div className="bg-white min-h-screen pt-20 container mx-auto p-8 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white border border-black rounded shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl rounded-lg">
            <div className="flex items-center">
              <div className={`rounded p-4 ${metric.color}`}>
                <metric.icon className="text-white text-3xl" />
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-black">{metric.title}</h5>
                <h3 className="font-bold text-4xl text-black">{metric.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-gray-600 my-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-800 rounded shadow-lg p-6 hover:scale-105 transition">
          <h5 className="font-bold uppercase text-gray-600 border-b border-gray-800 pb-2">User Growth</h5>
          <div className="p-5">
            <Line data={{ labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], datasets: [{ label: "Users", data: userData, borderColor: "rgb(54, 162, 235)", backgroundColor: "rgba(54, 162, 235, 0.2)" }] }} />
          </div>
        </div>
        <div className="bg-white border border-gray-800 rounded shadow-lg p-6 hover:scale-105 transition">
          <h5 className="font-bold uppercase text-gray-600 border-b border-gray-800 pb-2">Transaction Growth</h5>
          <div className="p-5">
            <Bar data={{ labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], datasets: [{ label: "Transactions", data: transactionData, backgroundColor: "rgba(255, 99, 132, 0.2)", borderColor: "rgb(255, 99, 132)" }] }} />
          </div>
        </div>
        <div className="bg-white border border-gray-800 rounded shadow-lg p-6 hover:scale-105 transition">
          <h5 className="font-bold uppercase text-gray-600 border-b border-gray-800 pb-2">User vs Transactions</h5>
          <div className="p-5">
            <Doughnut data={{ labels: ["Users", "Transactions"], datasets: [{ data: [userData.reduce((a, b) => a + b, 0), transactionData.reduce((a, b) => a + b, 0)], backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"] }] }} />
          </div>
        </div>
      </div>
      <footer className=" text-black text-center py-4 mt-12">
        <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
