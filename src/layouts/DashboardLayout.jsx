import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  Menu as MenuIcon,
  Users as UsersIcon,
  User as UserIcon,
  BookOpen,
  ShoppingBag,
  Coffee,
  ClipboardList,
  LogOut,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import { useSelector } from "react-redux";

const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Define navigation links based on role
  const navLinks =
    role === "superadmin"
      ? [
          {
            to: "/superadmin",
            text: "Dashboard",
            icon: <LayoutDashboard size={20} />,
          },
          {
            to: "/superadmin/pending-admins",
            text: "Pending Admins",
            icon: <UserIcon size={20} />,
          },
          {
            to: "/superadmin/admin-management",
            text: "Admin Management",
            icon: <UsersIcon size={20} />,
          },
        ]
      : [
          {
            to: "/customeradmin",
            text: "Dashboard",
            icon: <BarChart3 size={20} />,
          },
          {
            to: "/customeradmin/users",
            text: "Manage Users",
            icon: <UsersIcon size={20} />,
          },
          {
            to: "/customeradmin/waitermenus",
            text: "Waiter Menus",
            icon: <BookOpen size={20} />,
          },
          {
            to: "/customeradmin/menus",
            text: "Manage Menus",
            icon: <BookOpen size={20} />,
          },
          {
            to: "/customeradmin/categories",
            text: "Manage Menu Categories",
            icon: <BookOpen size={20} />,
          },
          {
            to: "/customeradmin/items",
            text: "Manage Items",
            icon: <ShoppingBag size={20} />,
          },
          {
            to: "/customeradmin/tables",
            text: "Manage Tables",
            icon: <Coffee size={20} />,
          },
          {
            to: "/customeradmin/orders",
            text: "View Orders",
            icon: <ClipboardList size={20} />,
          },
        ];

  const sidebarVariants = {
    open: { width: "250px" },
    closed: { width: "80px" },
  };

  const mainVariants = {
    open: { marginLeft: "250px" },
    closed: { marginLeft: "80px" },
  };

  return (
    <div className="flex h-screen bg-background-default">
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-10 overflow-x-hidden"
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <ChefHat size={24} />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3"
              >
                <h1 className="text-lg font-bold">
                  <span className="text-orange-600">Restro</span>Mate
                </h1>
                <p className="text-xs text-gray-500">
                  {role === "superadmin"
                    ? user?.restaurantName || "Super Admin"
                    : "Customer Admin"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <nav className="py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === `/${role}`}
              className={({ isActive }) =>
                isActive ? "nav-link-active mb-1 mx-2" : "nav-link mb-1 mx-2"
              }
            >
              {link.icon}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-2"
                  >
                    {link.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 transition-all duration-300"
        variants={mainVariants}
        animate={sidebarOpen ? "open" : "closed"}
      >
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <MenuIcon size={24} />
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="bg-orange-100 h-10 w-10 rounded-full flex items-center justify-center text-orange-600 font-medium">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Outlet */}
        <main
          className="p-4 md:p-6 overflow-auto"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
