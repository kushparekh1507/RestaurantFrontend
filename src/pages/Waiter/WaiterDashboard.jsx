import { useEffect, useState } from "react";
import { WaiterHeader } from "../../components/waiter/WaiterHeader";
import { TableGrid } from "../../components/waiter/TableGrid";
import { MenuItems } from "../../components/waiter/MenuItems";
import { mockMenuItems } from "../../data/mockData";
import { useSelector } from "react-redux";
import axios from "axios";
import { CurrentOrder } from "../../components/waiter/CurrentOrder";
import { useNavigate } from "react-router-dom";

const WaiterDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    tableId: null,
    tableNumber: null,
    items: [],
  });
  const navigate = useNavigate();

  const fetchTables = async () => {
    try {
      const res = await axios.get(`/api/Tables/waiter/${user.userId}`);
      setTables(res.data?.tables || []);
      console.log(res.data?.tables || []);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`/api/MenuItems/waiter/${user.userId}`);
      console.log(res.data || []);
      setMenuItems(res.data?.items || []);
      setCategories(res.data?.categories || []);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  const handleSelectTable = (table) => {
    setSelectedTable(table.tableId);
    setCurrentOrder((prev) => ({
      ...prev,
      tableId: table.tableId,
      tableNumber: table.tableNumber,
    }));
  };

  const handleAddItemToOrder = (itemId) => {
    const menuItem = menuItems.find((item) => item.menuItemId === itemId);
    if (!menuItem) return;

    const existingItemIndex = currentOrder.items.findIndex(
      (item) => item.menuItemId === itemId
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentOrder.items];
      updatedItems[existingItemIndex].quantity += 1;
      setCurrentOrder({ ...currentOrder, items: updatedItems });
    } else {
      setCurrentOrder({
        ...currentOrder,
        items: [...currentOrder.items, { ...menuItem, quantity: 1 }],
      });
    }
  };

  const handleUpdateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      setCurrentOrder({
        ...currentOrder,
        items: currentOrder.items.filter((item) => item.menuItemId !== itemId),
      });
    } else {
      setCurrentOrder({
        ...currentOrder,
        items: currentOrder.items.map((item) =>
          item.menuItemId === itemId ? { ...item, quantity } : item
        ),
      });
    }
  };

  const handleUpdateItemNotes = (itemId, notes) => {
    setCurrentOrder({
      ...currentOrder,
      items: currentOrder.items.map((item) =>
        item.id === itemId ? { ...item, notes } : item
      ),
    });
  };

  const handleSubmitOrder = async () => {
    const payload = {
      tableId: currentOrder.tableId,
      CustomerUserId: user.userId,
      restaurantId: user.restaurantId,
      items: currentOrder.items.map((item) => ({
        itemId: item.menuItemId,
        quantity: item.quantity,
        // notes: item.notes || "",
      })),
    };

    console.log("Submitting order:", payload);
    // return;

    await axios
      .post("/api/Orders/upsert", payload)
      .then((res) => {
        console.log("Order submitted successfully:", res.data);
        setCurrentOrder({ tableId: null, items: [], tableNumber: null });
        setSelectedTable(null);
        navigate("/waiter/pending-orders");
      })
      .catch((err) => {
        console.error("Error submitting order:", err);
      });
  };

  useEffect(() => {
    fetchTables();
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <WaiterHeader />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Waiter Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Tables
              </h2>
              <TableGrid
                tables={tables}
                selectedTableId={selectedTable}
                onSelectTable={handleSelectTable}
              />
            </div>

            {selectedTable && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Menu
                </h2>
                <MenuItems
                  menuItems={menuItems}
                  categories={categories}
                  onAddItem={handleAddItemToOrder}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <CurrentOrder
              order={currentOrder}
              onUpdateQuantity={handleUpdateItemQuantity}
              onUpdateNotes={handleUpdateItemNotes}
              onSubmitOrder={handleSubmitOrder}
              tableSelected={selectedTable !== null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterDashboard;
