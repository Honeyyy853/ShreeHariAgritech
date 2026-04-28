import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle } from "lucide-react";

const AddOffers = () => {
  const navigate = useNavigate();

  const promoRef = useRef();
  const nameRef = useRef();
  const discountRef = useRef();
  const validityRef = useRef();
  const statusRef = useRef();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addOffer = () => {
    const promocode = promoRef.current.value.trim();
    const offerName = nameRef.current.value.trim();
    const discount = discountRef.current.value;
    const validity = validityRef.current.value;
    const status = statusRef.current.value;

    if (!promocode || !offerName || !discount || !validity) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("promocode", promocode);
    formData.append("offerName", offerName);
    formData.append("discount_value", discount);
    formData.append("validity", validity);
    formData.append("status", status);

    setLoading(true);

    axios
      .post("http://localhost/ShreeHari/AddOffers.php", formData)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => navigate("/offers"), 1500);
      })
      .catch(() => alert("Error adding offer"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 shadow">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="font-semibold">Offer Added Successfully</p>
            <p className="text-sm">Redirecting...</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link to="/manage-offers">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Add New Offer</h1>
      </div>

      <Card hover={false}>
        <div className="space-y-4">
          <input
            ref={promoRef}
            className="input-field"
            placeholder="Promo Code *"
          />

          <input
            ref={nameRef}
            className="input-field"
            placeholder="Offer Name *"
          />

          <input
            ref={discountRef}
            type="number"
            className="input-field"
            placeholder="Discount % *"
          />

          <input
            ref={validityRef}
            type="number"
            className="input-field"
            placeholder="Validity (Days) *"
          />

          <select ref={statusRef} className="input-field">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </Card>

      <button
        onClick={addOffer}
        disabled={loading}
        className="btn-primary w-full py-3"
      >
        {loading ? "Saving..." : "Save Offer"}
      </button>
    </div>
  );
};

export default AddOffers;
