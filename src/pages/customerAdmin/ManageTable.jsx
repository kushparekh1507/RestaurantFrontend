import { useEffect, useState } from "react";
import TableForm from "../../components/common/TableForm";
import TabGroup from "../../components/common/TagGroup";
import TableLayout from "../../components/common/TableLayout";
import ReservationList from "../../components/common/ReservationList";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableFormModal from "../../components/Modal/TableFormModal";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageTable = () => {
  const [tables, setTables] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleAddClick = () => {
    setShowFormModal(true);
    setFormMode("add");
  };

  const handleUpdateClick = (table) => {
    console.log("Updating table:", table);
    setFormMode("edit");
    setSelectedTable(table);
    setSelectedTableId(table.tableId);
    setShowFormModal(true);
  };

  const handleSubmit = async (data) => {
    const payload = { ...data, restaurantId: user.restaurantId };

    console.log(payload);
    setLoading(true);

    if (formMode === "add") {
      await axios
        .post("/api/Tables", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          toast.error(
            e?.response?.data || "An error occurred while creating the table."
          );
          return false;
        });
    } else if (formMode === "edit") {
      payload.tableId = selectedTableId;
      await axios
        .put(`/api/Tables/${selectedTableId}`, payload)
        .then((res) => {})
        .catch((e) => {
          console.log(e);
          toast.error(e?.response?.data);
          return false;
        });
    }

    await fetchTables();
    setLoading(false);
    setSelectedTableId(null);
    setSelectedTable(null);
    setShowFormModal(false);

    return true;
  };

  const handleDeleteTable = async (tableId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the table permanently!",
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
        await axios.delete(`/api/Tables/${tableId}`);
        Swal.fire("Deleted!", `Table has been deleted.`, "success");
        fetchTables();
      } catch (error) {
        Swal.fire("Error", "There was a problem deleting the table.", "error");
        console.error(error);
      }
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    setLoading(true);
    await axios
      .get(`/api/Tables/Restaurant/${user.restaurantId}`)
      .then((res) => {
        console.log(res.data.tables);
        setTables(res.data.tables);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const tableFilters = ["All", "AC Hall", "Non AC Hall", "Candle Light Dinner"];

  const filteredTables = tables.filter((t) => {
    if (selectedFilter === "All") return true;
    return t.tableTypeName.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Table Management</h1>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-burgundy-dark flex items-center gap-2 transition-colors duration-200"
            onClick={handleAddClick}
          >
            <Plus size={16} />
            Add Table
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {tableFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedFilter === filter
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Table Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Table Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTables.map((t, index) => (
                <tr key={index}>
                  <td className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {t.tableNumber}
                  </td>
                  <td className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {t.capacity}
                  </td>
                  <td className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {t.tableTypeName}
                  </td>
                  <td className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit"
                        onClick={() => handleUpdateClick(t)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteTable(t.tableId)}
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

      <AnimatePresence>
        {showFormModal && (
          <TableFormModal
            mode={formMode}
            onSubmit={handleSubmit}
            onCancel={() => setShowFormModal(false)}
            initialData={selectedTable}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTable;
