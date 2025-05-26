import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import OrderManagement from "./pages/customerAdmin/OrderManagment";
import { loadUserFromToken } from "./redux/authSlice";

// Auth Pages
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));

// Super Admin Pages
const SuperAdminDashboard = lazy(() => import("./pages/superAdmin/Dashboard"));
const PendingAdmins = lazy(() => import("./pages/superAdmin/PendingAdmins"));
const AdminManagement = lazy(() =>
  import("./pages/superAdmin/AdminManagement")
);

// Customer Admin Pages
const CustomerAdminDashboard = lazy(() =>
  import("./pages/customerAdmin/Dashboard")
);
const ManageUsers = lazy(() => import("./pages/customerAdmin/ManageUsers"));
const ManageMenu = lazy(() => import("./pages/customerAdmin/ManageMenu"));
const ManageItems = lazy(() => import("./pages/customerAdmin/ManageItems"));
const ManageTable = lazy(() => import("./pages/customerAdmin/ManageTable"));

// ✅ Protected Route Component using Redux
// Protected Route Component using Redux
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // Wait for user fetch to finish
  if (isLoading) {
    return <LoadingSpinner message="User is loading" />;
  }

  // If not authenticated after loading
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have permission
  if (!allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const u = await dispatch(loadUserFromToken()).unwrap();
      console.log(u);
    }

    getData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* Super Admin Routes */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={["SuperAdmin"]}>
                  <DashboardLayout role="superadmin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<SuperAdminDashboard />} />
              <Route path="pending-admins" element={<PendingAdmins />} />
              <Route path="admin-management" element={<AdminManagement />} />
            </Route>

            {/* Customer Admin Routes */}
            <Route
              path="/customeradmin"
              element={
                <ProtectedRoute allowedRoles={["CustomerAdmin"]}>
                  <DashboardLayout role="CustomerAdmin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<CustomerAdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="menu" element={<ManageMenu />} />
              <Route path="items" element={<ManageItems />} />
              <Route path="tables" element={<ManageTable />} />
              <Route path="orders" element={<OrderManagement />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
