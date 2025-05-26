import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TableFormModal = ({
  mode = "add",
  initialData = {},
  onSubmit,
  onCancel,
}) => {
  const tnumRef = useRef();
  const capacityRef = useRef();

  useEffect(() => {
    if (initialData) {
      tnumRef.current.value = initialData.tableNumber || "";
      capacityRef.current.value = initialData.capacity || "";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      tableNumber: parseInt(tnumRef.current.value),
      capacity: parseInt(capacityRef.current.value),
    };

    if (onSubmit(data)) {
      tnumRef.current.value = "";
      capacityRef.current.value = "";
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
              {mode === "edit" ? "Update Table" : "Add Table"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Table Number</label>
                <input
                  type="number"
                  ref={tnumRef}
                  placeholder="Enter table number"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Capacity</label>
                <input
                  type="number"
                  ref={capacityRef}
                  min={2}
                  max={6}
                  placeholder="Enter capacity"
                  required
                  className="w-full border p-2 rounded"
                />
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

export default TableFormModal;
