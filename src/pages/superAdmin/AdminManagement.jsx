import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/common/StatCard";
import { Users, UserCheck, UserX } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminManagement = () => {
  const [cadmins, setCadmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'inactive'
  const [cadminStats, setCadminStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const getAllCustomerAdmins = async () => {
    await axios
      .get(`/api/Users/role/2`)
      .then((res) => {
        console.log(res.data);
        setCadmins(res.data);
        setFilteredAdmins(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchCustomerAdminStats = async () => {
    await axios
      .get("/api/Users/customeradmin/stats")
      .then((res) => {
        console.log(res.data);
        setCadminStats({
          total: res.data.total,
          active: res.data.active,
          inactive: res.data.inactive,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === "all") {
      setFilteredAdmins(cadmins);
    } else if (type === "active") {
      setFilteredAdmins(cadmins.filter((admin) => admin.status === 1));
    } else if (type === "inactive") {
      setFilteredAdmins(cadmins.filter((admin) => admin.status === 0));
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${
        newStatus === 1 ? "activate" : "deactivate"
      } this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `/api/Users/change-status/${userId}/status/${newStatus}`
        );
        Swal.fire("Success", "User status updated!", "success");
        await getAllCustomerAdmins(); // refresh data
        await fetchCustomerAdminStats(); // refresh stats
      } catch (e) {
        console.error("Error changing status:", e);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  useEffect(() => {
    getAllCustomerAdmins();
    fetchCustomerAdminStats();
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
          value={cadminStats.total}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Active Admins"
          value={cadminStats.active}
          icon={UserCheck}
          color="success"
        />
        <StatCard
          title="Inactive Admins"
          value={cadminStats.inactive}
          icon={UserX}
          color="warning"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4 my-4">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("active")}
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange("inactive")}
          className={`px-4 py-2 rounded ${
            filter === "inactive" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Inactive
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Admin List</h2>
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
              {filteredAdmins.map((admin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admin.mobileNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() =>
                        handleStatusToggle(admin.userId, admin.status)
                      }
                      className={`${
                        admin.status === 1
                          ? "text-red-600 hover:text-red-900"
                          : "text-green-600 hover:text-green-900"
                      }`}
                    >
                      {admin.status === 1 ? "Deactivate" : "Activate"}
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
