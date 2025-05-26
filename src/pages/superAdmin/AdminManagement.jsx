// src/pages/Admin/AdminManagement.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/common/StatCard";
import { Users, UserCheck, UserX } from "lucide-react";
import axios from "axios";

const AdminManagement = () => {
  const [cadmins, setCadmins] = useState([]);

  const getAllCustomerAdmins = async () => {
    await axios
      .get(`/api/Users/role/2`)
      .then((res) => {
        console.log(res.data);
        setCadmins(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllCustomerAdmins();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Admins"
          value="24"
          icon={Users}
          trend={12}
          trendLabel="vs last week"
          color="primary"
        />
        <StatCard
          title="Active Admins"
          value="20"
          icon={UserCheck}
          trend={8}
          trendLabel="vs last week"
          color="success"
        />
        <StatCard
          title="Inactive Admins"
          value="4"
          icon={UserX}
          trend={-2}
          trendLabel="vs last week"
          color="warning"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Admin List</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add New Admin
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cadmins.map((admin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admin.mobileNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {admin.status == 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-red-600 hover:text-red-900">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminManagement;
