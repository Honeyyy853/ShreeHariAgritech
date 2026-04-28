import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle, Upload, X } from "lucide-react";

const EditHerbs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const unitRef = useRef();
  const descRef = useRef();
  const offerref = useRef();
  const imgRef = useRef();
  const [oldimage, setOldImage] = useState();
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("id", id);
    axios
      .post(`http://localhost/ShreeHari/getSingleHerb.php`, formdata)
      .then((res) => {
        const json = res.data;
        if (json.status == "true") {
          var data = json.data;
          nameRef.current.value = data.name;
          priceRef.current.value = data.price;
          unitRef.current.value = data.unit;

          setOldImage(data.image);
          descRef.current.value = data.description || "";
          offerref.current.value = data.offerId || "";
        }
      });
  }, [id]);

  const updateHerb = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", nameRef.current.value.trim());
    formData.append("price", priceRef.current.value);
    formData.append("unit", unitRef.current.value.trim());
    formData.append("description", descRef.current.value.trim());
    formData.append("offerId", offerref.current.value);

    if (imgRef.current && imgRef.current.files.length > 0) {
      formData.append("image", imgRef.current.files[0]);
    }
    axios
      .post("http://localhost/ShreeHari/updateHerb.php", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "true") {
          setShowSuccess(true);
          setTimeout(() => navigate("/manage-Herbs"), 1500);
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch(() => alert("Server error"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/fetchOfferdetails.php")
      .then((response) => {
        if (response.status === 200) {
          setOffers(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching offers", error);
      });
  }, []);
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 shadow">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="font-semibold">Herb Updated Successfully</p>
            <p className="text-sm">Redirecting...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/manage-Herbs">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Edit Herb</h1>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="md:col-span-2">
          <Card hover={false}>
            <div className="space-y-4">
              <input
                ref={nameRef}
                className="input-field"
                placeholder="Product Name *"
              />

              <input
                ref={priceRef}
                type="number"
                className="input-field"
                placeholder="Price *"
              />

              <input
                ref={unitRef}
                className="input-field"
                placeholder="Unit (100g, 50g) *"
              />

              <textarea
                ref={descRef}
                rows="4"
                className="input-field"
                placeholder="Description"
              />
              <label>Choose an Offer:</label>
              <select ref={offerref} className="input-field">
                <option value="">No Offer</option>
                {offers.map((offer) => (
                  <option key={offer.offer_id } value={offer.offer_id }>
                    {offer.offerName} - {offer.discount}% OFF
                  </option>
                ))}
                
              </select>
            </div>
          </Card>
        </div>

        {/* Right Image */}
        <div>
          <Card hover={false}>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-full h-64 object-cover rounded"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    imgRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-dashed border rounded cursor-pointer">
                <img
                  src={`http://localhost/ShreeHari/uploads/Herbs/${oldimage}`}
                  className="w-full h-64 object-cover rounded"
                />
                {/* <Upload className="mb-2 text-gray-400" />
                <p className="text-sm">Upload Image </p> */}

                <input ref={imgRef} type="file" accept="image/*" />
              </label>
            )}
          </Card>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={updateHerb}
        disabled={loading}
        className="btn-primary w-full py-3"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
};

export default EditHerbs;
