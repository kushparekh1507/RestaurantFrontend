import { useEffect, useState } from "react";
import ItemForm from "../../components/common/ItemForm";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import ItemGrid from "../../components/common/ItemGrid";
import { Plus, Filter, GridIcon, List } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import MenuItemFormModal from "../../components/Modal/MenuItemFormModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState("all"); // menuId
  const [selectedCategory, setSelectedCategory] = useState("all"); // categoryId
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((s) => s.auth);

  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddClick = () => {
    setShowFormModal(true);
    setMode("add");
  };

  const handleEditClick = (item) => {
    setShowFormModal(true);
    setMode("edit");
    setSelectedItem(item);
    setSelectedItemId(item.menuItemId);
  };

  const handleDeleteItem = async (menuItemId, itemName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete "${itemName}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoading(true);
      setMessage("Deleting item...");
      try {
        await axios.delete(`/api/MenuItems/${menuItemId}`);
        toast.success(`"${itemName}" deleted successfully`);
        await fetchItemsAndMenus(); // Refresh list after delete
      } catch (error) {
        console.error("Error deleting menu item:", error);
        toast.error("Failed to delete the item.");
      }
      setLoading(false);
    }
  };

  const fetchItemsAndMenus = async () => {
    try {
      const itemsRes = await axios.get(
        `/api/MenuItems/restaurant/${user.restaurantId}`
      );
      const menusRes = await axios.get(
        `/api/Menus/restaurant/${user.restaurantId}`
      );
      const categoriesRes = await axios.get(
        `/api/MenuCategories/restaurant/${user.restaurantId}`
      );

      console.log("Items:", itemsRes.data.items);
      console.log("Menus:", menusRes.data.menus);
      console.log("Categories:", categoriesRes.data.categories);

      setMenuItems(itemsRes.data.items);
      setMenus([{ menuId: "all", menuName: "All" }, ...menusRes.data.menus]);
      setMenuCategories(categoriesRes.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (data) => {
    const payload = data;
    console.log(payload);

    setLoading(true);

    if (mode === "add") {
      setMessage("Item is creating and image is uploading");
      await axios
        .post("/api/MenuItems", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => toast.success("Item is created."))
        .catch((e) => console.log(e));
    } else if (mode === "edit") {
      payload.append("menuItemId", selectedItemId);
      setMessage("Item is updating and image is uploading");
      await axios
        .put(`/api/MenuItems/${selectedItemId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => toast.success("Item is updated."))
        .catch((e) => console.log(e));
    }

    setLoading(false);
    await fetchItemsAndMenus();
    setShowFormModal(false);
    setSelectedItem(null);
    setSelectedItemId(null);
    setMode("add");

    return true;
  };

  useEffect(() => {
    fetchItemsAndMenus();
  }, []);

  // ✅ Filter categories based on selected Menu (local filter)
  const filteredCategories =
    selectedMenu === "all"
      ? []
      : menuCategories.filter((cat) => cat.menuId === selectedMenu);

  // ✅ Filter items locally
  const filteredItems = menuItems.filter((item) => {
    const matchesMenu = selectedMenu === "all" || item.menuId === selectedMenu;
    const matchesCategory =
      selectedCategory === "all" || item.menuCategoryId === selectedCategory;
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesMenu && matchesCategory && matchesSearch;
  });

  if (loading) return <LoadingSpinner message={message} />;

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Item Management</h1>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 flex items-center gap-2 transition-colors duration-200"
          onClick={handleAddClick}
        >
          <Plus size={16} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {/* Menu Filter */}
        <div className="flex flex-wrap gap-2">
          {menus.map((menu) => (
            <button
              key={menu.menuId}
              className={`px-3 py-1 rounded-full border ${
                selectedMenu === menu.menuId
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setSelectedMenu(menu.menuId);
                setSelectedCategory("all"); // Reset category when menu changes
              }}
            >
              {menu.menuName}
            </button>
          ))}
        </div>

        {/* Category Filter (if menu selected) */}
        {selectedMenu !== "all" && (
          <CategoryFilter
            categories={[
              { menuCategoryId: "all", categoryName: "All" },
              ...filteredCategories,
            ]}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        )}

        {/* Search & View Options */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SearchBar
            placeholder="Search items..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <GridIcon size={20} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <List size={20} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <ItemGrid
          items={filteredItems}
          onEdit={handleEditClick}
          onDelete={handleDeleteItem}
        />
      </div>

      {showFormModal && (
        <MenuItemFormModal
          initialData={selectedItem}
          onCancel={() => setShowFormModal(false)}
          mode={mode}
          onSubmit={handleSubmit}
          categories={menuCategories}
          menus={menus.filter((m) => m.menuId != "all")}
        />
      )}
    </div>
  );
};

export default ManageItems;
