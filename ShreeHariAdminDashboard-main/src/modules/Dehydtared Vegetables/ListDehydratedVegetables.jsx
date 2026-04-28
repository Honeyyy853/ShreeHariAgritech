import axios from "axios";
import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ListDehydratedVegetables = () => {
  const [DataCat, setDataCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/ListDehydratedVegetables.php")
      .then((response) => {
        if (response.status === 200) {
          setDataCat(response.data.data || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(
        "http://localhost/ShreeHari/deleteDehydratedVegetables.php",
        formData
      )
      .then((response) => {
        if (response.data.status == "true") {
          alert(response.data.message);
          setDataCat(DataCat.filter((item) => item.id !== id));
        } else {
          alert(response.data.message);
        }
      })
      .catch(() => alert("Error deleting item"));
  }

  if (loading) {
    return (
      <div className="p-6 text-center min-h-screen">Loading products...</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Dehydrated Vegetables</h1>
        <Link
          to="/add-DehydratedVegetables"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Add Dehydrated Vegetables
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-bold">ID</th>
              <th className="px-6 py-3 text-xs font-bold">Image</th>
              <th className="px-6 py-3 text-xs font-bold">Name</th>
              <th className="px-6 py-3 text-xs font-bold">Description</th>
              <th className="px-6 py-3 text-xs font-bold">Offer</th>
              <th className="px-6 py-3 text-xs font-bold">Price</th>
              <th className="px-6 py-3 text-xs font-bold">Unit</th>
              <th className="px-6 py-3 text-xs font-bold">Category</th>
              <th className="px-6 py-3 text-xs font-bold text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {DataCat.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={`http://localhost/ShreeHari/uploads/DehydratedVegetables/${item.image}`}
                    className="h-14 w-14 rounded border object-cover"
                  />
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.description}</td>
                <td className="px-6 py-4">{item.offerName || "-"}</td>
                <td className="px-6 py-4">₹ {item.price}</td>
                <td className="px-6 py-4">{item.unit}</td>
                <td className="px-6 py-4">{item.category_name || "-"}</td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link
                    to={`/edit-DehydratedVegetables/${item.id}`}
                    className="p-2 bg-blue-100 rounded-lg"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-100 rounded-lg"
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

export default ListDehydratedVegetables;
