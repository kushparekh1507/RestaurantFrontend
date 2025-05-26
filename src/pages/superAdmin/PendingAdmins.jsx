// src/pages/superAdmin/PendingAdmins.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users as UsersIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PendingAdmins = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Filter by search term
  const filtered = pendingAdmins.filter(
    (admin) =>
      admin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin?.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveReject = async (status, id) => {
    console.log(id);
    console.log(status);
    setLoading(true);
    setMessage("Sending an email");
    await axios
      .post(`/api/Restaurants/approve_reject/${id}`, {
        Status: Number(status),
      })
      .then((res) => {
        console.log(res);
        // navigate("/superadmin/admin-management");
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
    setMessage("");
    fetchPendingRestaurants();
  };

  const fetchPendingRestaurants = async () => {
    await axios
      .get("/api/Restaurants/pending")
      .then((res) => {
        console.log(res.data);
        setPendingAdmins(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  if (loading) return <LoadingSpinner message={message} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Pending Customer Admins
        </h1>
        <p className="text-gray-600">
          Review and approve restaurant owner registrations.
        </p>
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UsersIcon className="text-orange-600" size={24} />
            Pending Customer Admin Details
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input-field w-64 pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white px-3 py-1 rounded">
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Email", "Mobile No", "Restaurant", "Address", "Actions"].map(
                  (h) => (
                    <th key={h} className="table-header text-left">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((admin, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="table-cell">{admin.email}</td>
                    <td className="table-cell">{admin.mobileNo}</td>
                    <td className="table-cell">{admin.name}</td>
                    <td className="table-cell">{admin.address}</td>
                    <td className="table-cell">
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded mr-2 transition cursor-pointer"
                        onClick={() =>
                          handleApproveReject(3, admin.restaurantId)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition cursor-pointer"
                        onClick={() =>
                          handleApproveReject(2, admin.restaurantId)
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No pending admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingAdmins;
