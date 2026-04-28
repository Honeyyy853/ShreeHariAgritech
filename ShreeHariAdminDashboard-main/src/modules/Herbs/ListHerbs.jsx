import axios from "axios";
import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ListHerbs = () => {
  const [DataCat, setDataCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteHerbs, setDeleteHerbs] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/ListHerbs.php")
      .then((response) => {
        if (response.status === 200) {
          setDataCat(response.data.data || []);
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
      "Are you sure you want to delete this herbs?"
    );
    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/ShreeHari/deleteHerbs.php", formData)
      .then((response) => {
        var json = response.data;
        if (json.status == "true") {
          alert(json.message);
          setDataCat(DataCat.filter((item) => item.id !== id));
        } else {
          alert(json.message);
        }
      })
      .catch(() => alert("Error delete Herbs"));
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Herbs
        </h1>

        <Link
          to="/add-Herbs"
          className="text-white bg-primary px-4 py-2 rounded-lg"
        >
          + Add Herbs
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Image</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold">Offer</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Price</th>
              <th className="px-6 py-3 text-left text-xs font-bold">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-bold">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {DataCat.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{idx + 1}</td>

                <td className="px-6 py-4">
                  <img
                    src={`http://localhost/ShreeHari/uploads/Herbs/${item.image}`}
                    alt={item.name}
                    className="h-14 w-14 rounded object-cover border"
                  />
                </td>

                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.description}</td>
                <td className="px-6 py-4">{item.offerName  || "-"}</td>
                <td className="px-6 py-4">{item.price}₹</td>
                <td className="px-6 py-4">{item.unit}gm</td>
                <td className="px-6 py-4">{item.category_name || "-"}</td>

                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link
                    to={`/edit-Herbs/${item.id}`}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {DataCat.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHerbs;
