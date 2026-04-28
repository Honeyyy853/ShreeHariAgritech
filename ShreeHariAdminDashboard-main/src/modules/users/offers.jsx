import axios from "axios";
import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ListOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/offers.php")
      .then((response) => {
        if (response.status === 200) {
          setOffers(response.data.data || []);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );
    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/ShreeHari/deleteOfffer.php", formData)
      .then((response) => {
        var json = response.data;

        if (json.status == "true") {
          alert(json.message);

          setOffers(offers.filter((item) => item.offer_id !== id));
        } else {
          alert(json.message);
        }
      })
      .catch(() => alert("Error deleting offer"));
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <p>Loading offers...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Offers
        </h1>

        <Link
          to="/addOffers"
          className="text-white bg-primary px-4 py-2 rounded-lg"
        >
          + Add Offer
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Promo Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Offer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Discount %
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Validity (Days)
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Created</th>
              <th className="px-6 py-3 text-right text-xs font-bold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{idx + 1}</td>

                <td className="px-6 py-4 font-semibold text-blue-600">
                  {item.promocode}
                </td>

                <td className="px-6 py-4">{item.offerName}</td>

                <td className="px-6 py-4">{item.discount_value} %</td>

                <td className="px-6 py-4">{item.validity} days</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link
                    to={`/editOffer/${item.offer_id}`}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.offer_id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {offers.length === 0 && (
          <div className="p-6 text-center text-gray-500">No offers found.</div>
        )}
      </div>
    </div>
  );
};

export default ListOffers;
