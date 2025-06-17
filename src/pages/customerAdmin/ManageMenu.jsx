import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import MenuFormModal from "../../components/Modal/MenuFormModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Swal from "sweetalert2";

const ManageMenu = () => {
  const [menus, setMenus] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedMenuFilter, setSelectedMenuFilter] = useState("all"); // 'all' by default

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
    setLoading(true);

    try {
      if (mode === "add") {
        setMessage("Creating Menu...");
        await axios.post("/api/MenuCategories", payload);
      } else {
        payload.menuCategoryId = selectedMenuId;
        setMessage("Updating Menu...");
        await axios.put(`/api/MenuCategories/${selectedMenuId}`, payload);
      }
      await fetchCategories();
      setShowFormModal(false);
      setSelectedMenuId(null);
      setSelectedMenu(null);
      setMode("add");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `/api/MenuCategories/restaurant/${user.restaurantId}`
      );
      setCategories(res.data?.categories || []);
      setFilteredCategories(res.data?.categories || []);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch(
        `/api/Menus/restaurant/${user.restaurantId}`
      );
      const data = await response.json();
      setMenus(data?.menus || []);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const handleDeleteMenu = async (menucategoryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the category permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      setMessage("Deleting Menu...");
      try {
        await axios.delete(`/api/MenuCategories/${menucategoryId}`);
        Swal.fire("Deleted!", "Menu category has been deleted.", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error", "There was a problem deleting the menu.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMenuFilter = (menuId) => {
    setSelectedMenuFilter(menuId);
    if (menuId === "all") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) => cat.menuId === menuId);
      setFilteredCategories(filtered);
    }
  };

  useEffect(() => {
    fetchCategories();
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
        <h1 className="text-2xl font-bold text-gray-800">
          Category Management
        </h1>
        <button
          onClick={handleAddClick}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          + Create Menu
        </button>
      </div>

      {/* Menu Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => handleMenuFilter("all")}
          className={`px-4 py-2 rounded-full border ${
            selectedMenuFilter === "all"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
          }`}
        >
          All
        </button>
        {menus.map((menu) => (
          <button
            key={menu.menuId}
            onClick={() => handleMenuFilter(menu.menuId)}
            className={`px-4 py-2 rounded-full border ${
              selectedMenuFilter === menu.menuId
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
            }`}
          >
            {menu.menuName}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Category Name
                </th>
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
              {filteredCategories.map((menu, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {menu?.categoryName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {menu?.menuName}
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
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                        onClick={() => handleUpdateClick(menu)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
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
          Showing {filteredCategories.length} result(s)
        </div>
      </div>

      {showFormModal && (
        <MenuFormModal
          initialData={selectedMenu}
          onSubmit={handleSubmit}
          onCancel={() => setShowFormModal(false)}
          mode={mode}
          menus={menus}
        />
      )}
    </motion.div>
  );
};

export default ManageMenu;
