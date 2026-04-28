import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = () => {
    setLoading(true);

    axios
      .get("http://localhost/ShreeHari/getOrders.php")
      .then((res) => {
        if (res.data.status) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
        }
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= SEARCH ================= */
  const filteredOrders = orders.filter((order) =>
    (order.order_id + " " + order.user_id + " " + order.item_status)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ================= UPDATE STATUS ================= */
  const updateOrderStatus = async (orderId, newStatus, product_id, payment_method) => {
    try {
      const formData = new FormData();
      formData.append("order_id", orderId);
      formData.append("order_status", newStatus);
      formData.append("product_id", product_id);

      if (
        payment_method?.toLowerCase() === "cod" &&
        (newStatus === "Delivered" || newStatus === "Completed")
      ) 
      {
        // formData.append("payment_status", "Paid");
      }
  
      const res = await axios.post(
        "http://localhost/ShreeHari/updateOrderItemStatus.php",
        formData
      );

      if (res.data.success) {
        alert("Order Updated ✅");
        fetchOrders();
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* ===== HEADER SAME AS USERS ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Orders
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and track customer orders
          </p>
        </div>
      </div>

      {/* ===== SEARCH SAME AS USERS ===== */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ===== TABLE SAME STYLE ===== */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <Th>Order</Th>
              <Th>User</Th>
              <Th>Product</Th>
              <Th>Qty</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Payment id</Th>
              <Th>Amount</Th>
              <Th>Address</Th>
              <Th>Method</Th>
              {/* <Th align="right">Actions</Th> */}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <Td>{o.order_id}</Td>
                  <Td>{o.user_name}</Td>
                  <Td>{o.product_name}</Td>
                  <Td>{o.quantity}</Td>
                  <Td>{o.order_date}</Td>

                  {/* STATUS */}
                  <Td>
                    <select
                      className="border rounded-lg px-2 py-1"
                      value={o.item_status}
                      onChange={(e) =>
                        updateOrderStatus(
                          o.order_id,
                          e.target.value,
                          o.product_id,
                          o.payment_method
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option value="Cancelled" disabled>
                        Cancelled
                      </option>
                    </select>
                  </Td>

                  <Td>
                    <PaymentBadge status={o.payment_status || "N/A"} />
                  </Td>
                  <Td>{o.payment_id || "N/A"}</Td>
                  <Td>₹{(o.quantity * o.price).toFixed(2)}</Td>

                  <Td>{o.shipping_address || "N/A"}</Td>

                  <Td>{o.payment_method || "COD"}</Td>

                  {/* ACTIONS SAME AS USERS */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
                    <IconBtn>
                      <Eye className="w-4 h-4 text-gray-600" />
                    </IconBtn>

                    <IconBtn color="blue">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </IconBtn>

                    <IconBtn color="red">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </IconBtn>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No orders found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= SMALL UI COMPONENTS ================= */

const Th = ({ children, align }) => (
  <th
    className={`px-6 py-3 text-${
      align || "left"
    } text-xs font-bold text-gray-600 uppercase tracking-wider`}
  >
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    {children}
  </td>
);

const IconBtn = ({ children, color }) => {
  const colors =
    color === "red"
      ? "bg-red-100 hover:bg-red-200"
      : color === "blue"
      ? "bg-blue-100 hover:bg-blue-200"
      : "bg-gray-100 hover:bg-gray-200";

  return (
    <button className={`p-2 rounded-lg transition ${colors}`}>
      {children}
    </button>
  );
};

const PaymentBadge = ({ status }) => {
  const map = {
    paid: "bg-green-100 text-green-800",
    cod: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        map[status?.toLowerCase()] || map.default
      }`}
    >
      {status}
    </span>
  );
};

export default Orders;
