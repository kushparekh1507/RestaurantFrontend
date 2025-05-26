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

const ManageItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Track selected category
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
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
  const handleDeleteItem = async (item) => {};

  const fetchItems = async () => {
    await axios
      .get(`/api/MenuItems/restaurant/${user.restaurantId}`)
      .then((res) => {
        console.log(res.data.items);
        setMenuItems(res.data.items);
      });
  };

  const fetchMenus = async () => {
    try {
      const res = await axios.get(
        `/api/MenuCategories/restaurant/${user.restaurantId}`
      );
      const categoriesFromDB = res.data;

      // Add "All" category manually at the beginning
      const categoriesWithAll = [
        { menuCategoryId: "all", categoryName: "All" },
        ...categoriesFromDB,
      ];

      setMenuCategories(categoriesWithAll);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data) => {
    const payload = data;
    console.log(payload);

    setLoading(true);

    if (mode == "add") {
      setMessage("Item is creating and image is uploading");
      await axios
        .post("/api/MenuItems", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    } else if (mode == "edit") {
      payload.append("menuItemId", selectedItemId);
      console.log(payload)
      setMessage("Item is updating and image is uploading");
      await axios
        .put(`/api/MenuItems/${selectedItemId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    }
    setLoading(false);

    await fetchItems();
    setShowFormModal(false);
    setSelectedItem(null);
    setSelectedItemId(null);
    setMode("add");

    return true;
  };

  useEffect(() => {
    fetchMenus();
    fetchItems();
  }, []);

  // ✅ Filter logic: based on selected category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      !selectedCategory ||
      item.menuCategoryId === selectedCategory;

    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <CategoryFilter
            categories={menuCategories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />

          <div className="flex gap-2">
            <SearchBar
              placeholder="Search items..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div className="flex border border-gray-300 rounded-md">
              <button>
                <GridIcon size={20} />
              </button>
              <button>
                <List size={20} />
              </button>
            </div>
            <button className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <ItemGrid items={filteredItems} onEdit={handleEditClick} />
      </div>
      {showFormModal && (
        <MenuItemFormModal
          initialData={selectedItem}
          onCancel={() => setShowFormModal(false)}
          mode={mode}
          onSubmit={handleSubmit}
          categories={menuCategories}
        />
      )}
    </div>
  );
};

export default ManageItems;
