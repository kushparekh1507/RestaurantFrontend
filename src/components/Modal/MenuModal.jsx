import React, { useRef } from "react";
import { motion } from "framer-motion";

const MenuModal = ({ mode = "add", initialData = {}, onSubmit, onCancel }) => {
  const tableTypes = [
    { id: 1, name: "AC Hall" },
    { id: 2, name: "Non AC Hall" },
    { id: 3, name: "Candle Light Dinner" },
  ];

  const type = useRef();
  const nameref = useRef();

  const handleSubmit = (e) => {
    e?.preventDefault();

    const data = {
      menuName: nameref.current.value,
      tableTypeId: parseInt(type.current.value),
    };

    if (onSubmit(data)) {
      nameref.current.value = "";
      type.current.value = "";
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
                  placeholder="Enter Menu Name"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Select Table Type
                </label>
                <select
                  required
                  className="w-full border p-2 rounded"
                  ref={type}
                >
                  <option value={""}>Select Table Type</option>
                  {tableTypes.map((t, index) => (
                    <option key={index} value={t?.id}>
                      {t?.name}
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

export default MenuModal;
