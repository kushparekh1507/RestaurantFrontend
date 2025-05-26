import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Eye,
  EyeOff,
  Search,
  Filter,
  SortAsc,
  Users as UsersIcon,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ManageUsers = () => {
  const { user } = useSelector((s) => s.auth);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // 1 = Active, 0 = Inactive
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const typeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName: nameRef.current.value,
      email: emailRef.current.value,
      userType: typeRef.current.value,
      restaurantId: user.restaurantId,
      mobileNo: mobileRef.current.value,
    };

    console.log(formData);
    setLoading(true);
    setMessage("User is creating and sending email");
    await axios
      .post("/api/Users/CustomerAdmin/CreateUser", formData)
      .then((res) => {
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
    setMessage("");
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/api/Users/Restaurant/${user.restaurantId}`);
      const users = res.data?.users || [];
      setCustomerUsers(users);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId, email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the user permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoading(true);
      setMessage("User is deleting and sending email");
      try {
        await axios.delete(`/api/Users/${userId}`);
        Swal.fire(
          "Deleted!",
          `User with email ${email} has been deleted.`,
          "success"
        );
        fetchUsers(); // refresh the user list
      } catch (error) {
        Swal.fire("Error", "There was a problem deleting the user.", "error");
        console.error(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when list, tab, or search changes
  useEffect(() => {
    const filtered = customerUsers.filter((u) => {
      const matchesTab = u.status === activeTab;
      const matchesSearch =
        u?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.userType.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });

    setFilteredUsers(filtered);
  }, [customerUsers, activeTab, searchTerm]);

  if (loading) return <LoadingSpinner message={message} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Manage Customer Users
        </h1>
        <p className="text-gray-600">
          Create and manage user accounts for your restaurant staff.
        </p>
      </div>

      {/* User Creation Form */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UsersIcon className="text-orange-600" size={24} />
          Add New User
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                ref={nameRef}
                type="text"
                className={`input-field `}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                ref={emailRef}
                type="email"
                className={`input-field`}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select id="role" ref={typeRef} className={`input-field `}>
                <option value="">Select Role</option>
                <option value="Waiter">Waiter</option>
                <option value="Chef">Chef</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile No.
              </label>
              <input
                id="mobileNo"
                ref={mobileRef}
                type="tel"
                className={`input-field`}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </motion.div>

      {/* User List */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className="flex gap-2">
            {[1, 0].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 1 ? "Active" : "Inactive"} Users
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <button className="btn-outline px-3 flex items-center gap-1">
              <Filter size={18} />
              <span className="hidden md:inline">Filter</span>
            </button>
            <button className="btn-outline px-3 flex items-center gap-1">
              <SortAsc size={18} />
              <span className="hidden md:inline">Sort</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["ID", "Name", "Email", "Role", "Status", "Delete"].map(
                  (h) => (
                    <th key={h} className="table-header text-left">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.userId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="table-cell">{user.userId}</td>
                    <td className="table-cell">{user.fullName}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.userType}</td>
                    <td className="table-cell">
                      {user.status == 1 ? "Active" : "Inactive"}
                    </td>
                    <td className="table-cell">
                      <button
                        className="text-orange-600 hover:text-orange-800 font-medium"
                        onClick={() =>
                          handleDeleteUser(user.userId, user.email)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
