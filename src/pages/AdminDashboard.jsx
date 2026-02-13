import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Cake,
  Package,
  Image,
  CheckCircle,
  Clock,
  Truck,
  Phone,
  AlertCircle,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Bell,
  User,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader,
  AlertCircle as AlertIcon,
} from "lucide-react";
import { adminAPI } from "../data/api";
import OrderDetailsModal from "../components/common/OrderDetailsModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState([
    {
      title: "Total Revenue",
      value: "₦0",
      change: "0%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      trend: "up",
    },
    {
      title: "Orders Today",
      value: "0",
      change: "0",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      trend: "up",
    },
    {
      title: "Pending Orders",
      value: "0",
      change: "0",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-400",
      trend: "down",
    },
    {
      title: "Delivered",
      value: "0",
      change: "0",
      icon: <Truck className="w-6 h-6" />,
      color: "bg-gradient-to-br from-emerald-500 to-green-400",
      trend: "up",
    },
  ]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [statsResponse, ordersResponse] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllOrders(),
      ]);

      if (statsResponse.data && statsResponse.data.summary) {
        const { summary } = statsResponse.data;

        setStats([
          {
            title: "Total Revenue",
            value: `₦${summary.revenue?.toLocaleString() || "0"}`,
            change: "Total",
            icon: <DollarSign className="w-6 h-6" />,
            color: "bg-gradient-to-br from-purple-500 to-pink-500",
            trend: "up",
          },
          {
            title: "Orders Today",
            value: `${summary.ordersToday || 0}`,
            change: "Today",
            icon: <ShoppingBag className="w-6 h-6" />,
            color: "bg-gradient-to-br from-blue-500 to-cyan-400",
            trend: "up",
          },
          {
            title: "Pending Orders",
            value: `${summary.pending || 0}`,
            change: "Active",
            icon: <Clock className="w-6 h-6" />,
            color: "bg-gradient-to-br from-amber-500 to-orange-400",
            trend: "down",
          },
          {
            title: "Delivered",
            value: `${summary.delivered || 0}`,
            change: "Completed",
            icon: <Truck className="w-6 h-6" />,
            color: "bg-gradient-to-br from-emerald-500 to-green-400",
            trend: "up",
          },
        ]);
      }

      if (ordersResponse.data) {
        setOrders(
          ordersResponse.data.map((order) => ({
            id: order.orderId || order._id,
            customer: order.customerName,
            amount: `₦${order.totalAmount?.toLocaleString() || "0"}`,
            items: order.cartItems?.length || 0,
            status: order.status,
            time: new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            avatar:
              order.customerName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2) || "CU",
            color: getStatusColor(order.status),
            phone: order.phone || "N/A",
            address: order.address || "N/A",
            paymentProof: order.paymentProofUrl || order.paymentProof,
            _id: order._id,
            fullOrder: order,
          })),
        );
      }

      setDashboardData(statsResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "preparing":
        return "bg-amber-100 text-amber-700";
      case "pending":
        return "bg-rose-100 text-rose-700";
      case "on delivery":
        return "bg-blue-100 text-blue-700";
      case "confirmed":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await adminAPI.login(password);

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
                color: getStatusColor(newStatus),
              }
            : order,
        ),
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }

      toast.success(`Order status updated to ${newStatus}`);
      setError("");
    } catch (error) {
      console.error("Error updating status:", error);
      setError(
        "Failed to update order status: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const response = await adminAPI.deleteOrder(orderId);

      if (response.data.success) {
        const orderNumber = response.data.deletedOrder?.orderId || orderId;
        toast.success(`Order #${orderNumber} deleted successfully!`);

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId),
        );

        if (selectedOrder?._id === orderId) {
          setShowModal(false);
          setSelectedOrder(null);
        }

        setTimeout(() => {
          fetchDashboardData();
        }, 1000);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        `Delete failed: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order.fullOrder || order);
    setShowModal(true);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm),
  );

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setDashboardData(null);
    setOrders([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 shadow-lg">
              <Cake className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Miwa Cakes Admin
            </h1>
            <p className="text-gray-500 mt-2">
              Enter admin password to continue
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                <AlertIcon className="w-5 h-5" />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Access Dashboard"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading && !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="flex flex-col md:flex-row min-h-screen pt-20">
        <aside className="w-full md:w-20 bg-white border-b md:border-b-0 md:border-r border-pink-100 p-3 md:p-4 flex flex-row md:flex-col items-center justify-between md:justify-start shadow-sm">
          <div className="md:mb-10">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
              <Cake className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </div>

          <nav className="flex flex-row md:flex-col items-center space-x-4 md:space-x-0 md:space-y-6">
            <button className="p-2 md:p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <a
              href="/admin/addproduct"
              className="p-2 md:p-3 rounded-xl text-gray-500 hover:bg-pink-50 transition-all hover:text-pink-600 relative group hover:shadow-md"
              title="Add Products"
            >
              <Package className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Add Products
              </span>
            </a>

            <button
              onClick={fetchDashboardData}
              className="p-2 md:p-3 rounded-xl text-gray-500 hover:bg-pink-50 transition-all hover:text-pink-600 hover:shadow-md"
              title="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 md:w-6 md:h-6 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </nav>

          <div className="md:mt-auto">
            <button
              onClick={handleLogout}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center hover:from-pink-200 hover:to-purple-200 transition-all hover:shadow-md group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 text-pink-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Miwa Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-500">
                Manage orders and track your bakery
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <button
                onClick={fetchDashboardData}
                className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors self-start sm:self-auto"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-5 h-5 text-gray-600 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertIcon className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow border border-gray-100 p-4 md:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-2 md:p-3 rounded-lg ${stat.color} text-white shadow-sm`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`text-xs md:text-sm font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-100 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Recent Orders{" "}
                    {filteredOrders.length > 0 && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({filteredOrders.length} orders)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500">
                    Latest customer orders
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
                    defaultValue=""
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="on delivery">On Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700">
                    No orders found
                  </h4>
                  <p className="text-gray-500">
                    Try changing your search or filters
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                  <table className="w-full min-w-[700px] md:min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Customer
                        </th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Amount
                        </th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Time
                        </th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                        >
                          <td className="py-3 px-3">
                            <span className="font-mono text-xs md:text-sm font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded-lg">
                              #{order.id}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${order.color} shadow-sm`}
                              >
                                {order.avatar}
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900 block text-sm">
                                  {order.customer}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {order.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg text-sm">
                              {order.amount}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateStatus(order._id, e.target.value)
                              }
                              className={`text-xs font-bold px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-pink-200 focus:outline-none cursor-pointer ${
                                order.status === "delivered"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : order.status === "preparing"
                                    ? "bg-amber-100 text-amber-700"
                                    : order.status === "pending"
                                      ? "bg-rose-100 text-rose-700"
                                      : order.status === "on delivery"
                                        ? "bg-blue-100 text-blue-700"
                                        : order.status === "confirmed"
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <option value="pending">🟡 Pending</option>
                              <option value="confirmed">🟣 Confirmed</option>
                              <option value="preparing">🟠 Preparing</option>
                              <option value="delivered">🟢 Delivered</option>
                            </select>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              {order.time}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="p-1.5 hover:bg-pink-100 rounded-lg transition-colors group relative"
                                title="View Order Details"
                              >
                                <Eye className="w-4 h-4 text-gray-600 group-hover:text-pink-600" />
                              </button>
                              <button
                                onClick={() =>
                                  window.open(order.paymentProof, "_blank")
                                }
                                className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors group relative"
                                title="View Payment Proof"
                              >
                                <Image className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group relative"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow border border-gray-100 p-4 md:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    Revenue This Week
                  </h3>
                  <div className="text-emerald-600 text-xs md:text-sm font-semibold flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {dashboardData?.revenueChange || 12.5}%
                  </div>
                </div>
                <div className="h-32 md:h-40 flex items-end gap-2 mb-4">
                  {[65, 80, 60, 90, 75, 85, 95].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center group"
                    >
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-pink-500 to-pink-300 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ₦
                    {dashboardData?.weeklyRevenue?.toLocaleString() ||
                      "245,800"}
                  </p>
                  <span className="text-xs text-gray-500">
                    +12.5% from last week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
