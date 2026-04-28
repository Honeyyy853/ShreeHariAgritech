import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye, Trash2, X } from "lucide-react";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch Data
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/inquiries.php")
      .then((response) => {
        if (response.status === 200) {
          setInquiries(response.data.data || []);
        }
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  // View
  const handleView = (item) => {
    setSelectedInquiry(item);
    setIsViewModalOpen(true);
  };

  // Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/ShreeHari/delete_inquiry.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          alert(res.data.message);
          setInquiries((prev) =>
            prev.filter((i) => i.inquiry_id !== id)
          );
        } else {
          alert(res.data.message);
        }
      })
      .catch(() => alert("Error deleting inquiry"));
  };

  // 🔥 STATUS UPDATE (ONLY Pending → Completed)
  const handleStatusUpdate = (item) => {
    if (item.status === "Completed") return; // lock

    setUpdatingId(item.inquiry_id);

    const formData = new FormData();
    formData.append("id", item.inquiry_id);
    formData.append("status", "Completed");

    axios
      .post("http://localhost/ShreeHari/update_inquiry.php", formData)
      .then(() => {
        setInquiries((prev) =>
          prev.map((i) =>
            i.inquiry_id === item.inquiry_id
              ? { ...i, status: "Completed" }
              : i
          )
        );
      })
      .catch(() => alert("Status update failed"))
      .finally(() => setUpdatingId(null));
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <p>Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Inquiries
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Product</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Message</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((item, idx) => (
              <tr key={item.inquiry_id} className="hover:bg-gray-50">

                <td className="px-6 py-4">{idx + 1}</td>

                <td className="px-6 py-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.email}</div>
                </td>

                <td className="px-6 py-4">{item.product}</td>

                <td className="px-6 py-4">{item.quantity}</td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-sm">
                  {item.message
                    ? item.message.slice(0, 30) + "..."
                    : "-"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleStatusUpdate(item)}
                    disabled={
                      item.status === "Completed" ||
                      updatingId === item.inquiry_id
                    }
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    {updatingId === item.inquiry_id
                      ? "Updating..."
                      : item.status === "Completed"
                      ? "Completed"
                      : "Pending"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 flex justify-end gap-2">

                  <button
                    onClick={() => handleView(item)}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                  >
                    <Eye className="w-4 h-4 text-green-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.inquiry_id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inquiries.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No inquiries found.
          </div>
        )}
      </div>

      {/* MODAL */}
      {isViewModalOpen && selectedInquiry && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">

      {/* HEADER (FIXED - no top line issue) */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Inquiry Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Product: {selectedInquiry.product}
          </p>
        </div>

        <button
          onClick={() => setIsViewModalOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

      </div>

      {/* BODY */}
      <div className="p-6 space-y-4 text-sm">

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500 text-xs">Name</p>
            <p className="font-semibold">{selectedInquiry.name}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500 text-xs">Email</p>
            <p className="font-semibold">{selectedInquiry.email}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500 text-xs">Phone</p>
            <p className="font-semibold">{selectedInquiry.phone}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500 text-xs">Quantity</p>
            <p className="font-semibold">{selectedInquiry.quantity}</p>
          </div>

        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-gray-500 text-xs">Date</p>
          <p className="font-semibold">
            {new Date(selectedInquiry.created_at).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="text-gray-500 text-xs">Message</p>
          <p className="font-medium text-gray-700 whitespace-pre-line">
            {selectedInquiry.message || "No message"}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end">

        <button
          onClick={() => setIsViewModalOpen(false)}
          className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          Close
        </button>

      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default Inquiries;