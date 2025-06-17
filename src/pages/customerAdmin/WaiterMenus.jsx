import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const WaiterMenus = () => {
  const { user } = useSelector((s) => s.auth);
  const [wms, setWms] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  const fetchWaiters = async () => {
    await axios
      .get(`/api/Users/restaurant/users/${user.restaurantId}/waiter`)
      .then((res) => {
        console.log(res.data?.users);
        setWaiters(res.data?.users);
      })
      .catch((err) => {
        console.error("Error fetching waiter menus:", err);
      });
  };

  const fetchMenus = async () => {
    await axios
      .get(`/api/Menus/restaurant/${user.restaurantId}`)
      .then((res) => {
        console.log(res.data?.menus);
        setMenus(res.data?.menus);
      })
      .catch((err) => {
        console.error("Error fetching waiter menus:", err);
      });
  };

  const fetchWaiterMenus = async () => {
    await axios
      .get(`/api/WaiterMenus/restaurant/${user.restaurantId}`)
      .then((res) => {
        console.log(res.data?.waiterMenus);
        setWms(res.data?.waiterMenus);
      })
      .catch((err) => {
        console.error("Error fetching waiter menus:", err);
      });
  };

  const handleCreateWaiterMenu = async (e) => {
    e?.preventDefault();
    if (!selectedWaiter || !selectedMenu) {
      toast.error("Please select both a waiter and a menu.");
      return;
    }

    const formData = {
      waiterId: selectedWaiter,
      menuId: selectedMenu,
    };

    console.log("Creating Waiter Menu:", formData);
    await axios
      .post(`/api/WaiterMenus/assignMenu`, formData)
      .then((res) => {
        console.log("Waiter Menu created:", res.data);
        toast.success("Waiter Menu created successfully.");
        fetchWaiterMenus();
        setSelectedWaiter("");
        setSelectedMenu("");
      })
      .catch((err) => {
        toast.error(err?.response?.data);
        console.error("Error creating waiter menu:", err);
      });
  };

  const handleDeleteWaiterMenu = async (waiterId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the waiter menu permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/WaiterMenus/removeMenu/${waiterId}`);
        Swal.fire("Deleted!", `Waiter Menu has been deleted.`, "success");
        fetchWaiterMenus(); // refresh the user list
      } catch (error) {
        Swal.fire("Error", "There was a problem deleting the menu.", "error");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchWaiters();
    fetchMenus();
    fetchWaiterMenus();
  }, []);

  return (
    <motion.div
      className="p-6 bg-orange-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Category Management
        </h1>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
          + Create Menu
        </button>
      </div>

      <form
        onSubmit={handleCreateWaiterMenu}
        className="bg-white rounded-lg shadow p-6 mb-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Assign Menu to Waiter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Waiter
            </label>
            <select
              value={selectedWaiter}
              onChange={(e) => setSelectedWaiter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">-- Choose Waiter --</option>
              {waiters.map((waiter) => (
                <option key={waiter.userId} value={waiter.userId}>
                  {waiter.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Menu
            </label>
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">-- Choose Menu --</option>
              {menus.map((menu) => (
                <option key={menu.menuId} value={menu.menuId}>
                  {menu.menuName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            Assign Menu
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Waiter Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Menu Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {wms.map((wm, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {wm?.waiterName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {wm?.menuName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteWaiterMenu(wm.waiterId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default WaiterMenus;
