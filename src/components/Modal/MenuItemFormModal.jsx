import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MenuItemFormModal = ({
  mode = "add",
  initialData = {},
  menus = [],
  categories = [],
  onSubmit,
  onCancel,
}) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const nameRef = useRef();
  const [categoryId, setCategoryId] = useState("");
  const [menuId, setMenuId] = useState("");
  const priceRef = useRef();
  const descRef = useRef();
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", nameRef.current.value);
    formData.append("menuCategoryId", categoryId);
    formData.append("price", priceRef.current.value);
    formData.append("description", descRef.current?.value || "");
    if (image) {
      formData.append("imageFile", image);
    }
    console.log(formData);

    if (onSubmit(formData)) {
      nameRef.current.value = "";
      descRef.current.value = "";
      priceRef.current.value = "";
      catRef.current.value = "";
      setMenuId("");
      setImage(null);
    }
  };

  useEffect(() => {
    if (initialData) {
      setMenuId(initialData?.menuId);
      setFilteredCategories(
        categories.filter((m) => m.menuId == initialData?.menuId)
      );
      nameRef.current.value = initialData.itemName;
      descRef.current.value = initialData.description;
      priceRef.current.value = initialData.price;
      setCategoryId(initialData.menuCategoryId); // Set categoryId from initialData
      setImage(null);
    }
  }, []);

  useEffect(() => {
    if (menuId != "") {
      setFilteredCategories(categories.filter((m) => m.menuId == menuId));
    } else {
      setFilteredCategories([]);
    }
  }, [menuId]);

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
                <label className="block font-medium mb-1">Item Name</label>
                <input
                  ref={nameRef}
                  placeholder="Enter Menu Item Name"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Menu Description
                </label>
                <input
                  ref={descRef}
                  placeholder="Enter Items Description"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Select Menu</label>
                <select
                  value={menuId}
                  onChange={(e) => setMenuId(e?.target?.value)}
                  className="w-full border p-2 rounded cursor-pointer"
                >
                  <option value="">Select Menu</option>
                  {menus.map((c) => (
                    <option key={c.menuId} value={c.menuId}>
                      {c.menuName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Select Category
                </label>
                <select
                  value={categoryId} // Controlled by state
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border p-2 rounded cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {filteredCategories.map((c) => (
                    <option key={c.menuCategoryId} value={c.menuCategoryId}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Price</label>
                <input
                  ref={priceRef}
                  type="number"
                  placeholder="Price"
                  className="p-3 rounded-xl border"
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="itemImage">
                  Select Image
                </label>
                <input
                  type="file"
                  id="itemImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-3 rounded-xl border"
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

export default MenuItemFormModal;
