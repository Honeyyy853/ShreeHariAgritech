import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart, Users, IndianRupee } from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [statsData, setStatsData] = useState([]);
  const [productGraph, setProductGraph] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) return navigate("/login");

    const admin = JSON.parse(adminData);
    if (admin.status !== "true") return navigate("/login");

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const summaryRes = await axios.get(
        "http://localhost/ShreeHari/dashboardSummary.php"
      );
      const data = summaryRes.data || {};

      setStatsData([
        { title: "Revenue", value: `₹${data.totalRevenue || 0}`, icon: IndianRupee, color: "bg-green-100 text-green-600" },
        { title: "Products", value: data.totalProducts || 0, icon: ShoppingCart, color: "bg-green-100 text-green-600" },
        { title: "Orders", value: data.totalOrders || 0, icon: Eye, color: "bg-green-100 text-green-600" },
        { title: "Users", value: data.totalUsers || 0, icon: Users, color: "bg-green-100 text-green-600" },
      ]);

      const productRes = await axios.get(
        "http://localhost/ShreeHari/dashboardGraph.php"
      );

      setProductGraph(
        (productRes.data?.data || []).map((item) => ({
          name: item.name,
          price: Number(item.price),
        }))
      );

      const salesRes = await axios.get(
        "http://localhost/ShreeHari/sales.php"
      );

      setSalesData(
        (salesRes.data || []).map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          sales: Number(item.sales),
        }))
      );

      const topRes = await axios.get(
        "http://localhost/ShreeHari/topProducts.php"
      );

      setTopProducts(
        (topRes.data?.data || []).map((item) => ({
          name: item.name,
          sold: Number(item.sold),
        }))
      );

      const orderRes = await axios.get(
        "http://localhost/ShreeHari/recentOrders.php"
      );

      setRecentOrders(orderRes.data?.data || []);

    } catch (err) {
      console.log(err);
      localStorage.removeItem("admin");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800">🌿 Admin Dashboard</h1>
        <p className="text-green-600">Your herbal store insights</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <h2 className="text-xl font-bold">{stat.value}</h2>
                </div>
                <div className={`p-3 rounded ${stat.color}`}>
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Product Prices */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-green-700 border-b-2 border-green-600 pb-2">Product Prices</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#16A34A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-green-700 border-b-2 border-green-600 pb-2">Sales</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="sales" stroke="#16A34A" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-3 text-green-700 border-b-2 border-green-600 pb-2">Top Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4 text-green-700 border-b-2 border-green-600 pb-2">Recent Orders</h2>

          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Order #{order.order_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-green-600 font-bold text-lg">
                  ₹{order.total_amount}
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}