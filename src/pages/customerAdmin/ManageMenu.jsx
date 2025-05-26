// src/pages/customerAdmin/ManageMenu.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import MenuFormModal from "../../components/Modal/MenuFormModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Swal from "sweetalert2";

const ManageMenu = () => {
  const { user } = useSelector((s) => s.auth);
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddClick = () => {
    setShowFormModal(true);
    setMode("add");
    setSelectedMenuId(null);
    setSelectedMenu(null);
  };

  const handleUpdateClick = (menu) => {
    setShowFormModal(true);
    setMode("edit");
    setSelectedMenu(menu);
    setSelectedMenuId(menu.menuCategoryId);
  };

  const handleSubmit = async (data) => {
    const payload = { ...data, restaurantId: user.restaurantId };
    console.log(payload);

    setLoading(true);
    if (mode === "add") {
      setMessage("Menu is creating.");
      await axios
        .post("/api/MenuCategories", payload)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    } else {
      payload.menuCategoryId = selectedMenuId;
      setMessage("Menu is updating.");
      await axios
        .put(`/api/MenuCategories/${selectedMenuId}`, payload)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    }
    setLoading(false);

    await fetchMenus();
    setShowFormModal(false);
    setSelectedMenuId(null);
    setSelectedMenu(null);
    setMode("add");

    return true;
  };

  const fetchMenus = async () => {
    await axios
      .get(`/api/MenuCategories/restaurant/${user.restaurantId}`)
      .then((res) => {
        console.log(res.data);
        setMenus(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteMenu = async (menucategoryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will category the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoading(true);
      setMessage("Menu is deleting");
      try {
        await axios.delete(`/api/MenuCategories/${menucategoryId}`);
        Swal.fire("Deleted!", `Menu category has been deleted.`, "success");
        fetchMenus(); // refresh the user list
      } catch (error) {
        Swal.fire("Error", "There was a problem deleting the menu.", "error");
        console.error(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  if (loading) return <LoadingSpinner message={message} />;

  return (
    <motion.div
      className="p-6 bg-orange-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={handleAddClick}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          + Create Menu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Menu Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {menus.map((menu, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {menu?.categoryName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {menu?.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {menu?.menuItems?.length} items
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit"
                        onClick={() => handleUpdateClick(menu)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteMenu(menu.menuCategoryId)}
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
        <div className="mt-4 text-sm text-gray-600">
          Showing 1 to {menus?.length} of {menus?.length} results
        </div>
      </div>
      {showFormModal && (
        <MenuFormModal
          initialData={selectedMenu}
          onSubmit={handleSubmit}
          onCancel={() => setShowFormModal(false)}
          mode={mode}
        />
      )}
    </motion.div>
  );
};

export default ManageMenu;
