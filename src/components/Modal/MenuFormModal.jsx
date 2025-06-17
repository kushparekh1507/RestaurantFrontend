import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MenuFormModal = ({
  mode = "add",
  initialData = {},
  onSubmit,
  onCancel,
  menus = [],
}) => {
  const nameref = useRef();
  const desref = useRef();
  const menuId = useRef();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (initialData) {
      nameref.current.value = initialData.categoryName || "";
      desref.current.value = initialData.description || "";
      menuId.current.value = initialData.menuId || "";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      categoryName: nameref.current.value,
      description: desref.current.value,
      menuId: parseInt(menuId.current.value),
    };

    if (data.categoryName.length < 6) {
      console.log("triggered");
      return;
    }

    if (onSubmit(data)) {
      nameref.current.value = "";
      desref.current.value = "";
      menuId.current.value = "";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg w-96 shadow-xl"
        initial={{ scale: 0.8, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "edit" ? "Update Menu" : "Add Menu"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Menu Name</label>
                <input
                  ref={nameref}
                  placeholder="Enter Menu Category Name"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Menu Description
                </label>
                <input
                  ref={desref}
                  placeholder="Enter Category Description"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Select Menu</label>
                <select
                  required
                  className="w-full border p-2 rounded"
                  ref={menuId}
                >
                  <option value={""}>Select Menu Type</option>
                  {menus.map((m, index) => (
                    <option key={index} value={m?.menuId}>
                      {m?.menuName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                  {mode === "edit" ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuFormModal;
