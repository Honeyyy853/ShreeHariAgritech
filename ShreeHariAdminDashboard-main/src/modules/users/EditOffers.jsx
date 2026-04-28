import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle } from "lucide-react";

const EditOffers = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const promoRef = useRef();
  const nameRef = useRef();
  const discountRef = useRef();
  const validityRef = useRef();
  const statusRef = useRef();

  const [loading,setLoading]=useState(false);
  const [showSuccess,setShowSuccess]=useState(false);

  useEffect(()=>{

    const formData=new FormData();
    formData.append("id",id);

    axios.post("http://localhost/ShreeHari/getSingleOffer.php",formData)
    .then(res=>{

      if(res.data.status==="true"){

        const data=res.data.data;

        promoRef.current.value=data.promocode;
        nameRef.current.value=data.offerName;
        discountRef.current.value=data.discount_value;
        validityRef.current.value=data.validity;
        statusRef.current.value=data.status;

      }

    });

  },[id]);

  const updateOffer=()=>{

    setLoading(true);

    const formData=new FormData();

    formData.append("id",id);
    formData.append("promocode",promoRef.current.value);
    formData.append("offerName",nameRef.current.value);
    formData.append("discount_value",discountRef.current.value);
    formData.append("validity",validityRef.current.value);
    formData.append("status",statusRef.current.value);

    axios.post("http://localhost/ShreeHari/updateOffer.php",formData)
    .then(res=>{

      if(res.data.status==="true"){
        setShowSuccess(true);
        setTimeout(()=>navigate("/offers"),1500);
      }

    })
    .finally(()=>setLoading(false));

  };

  return (

    <div className="p-6 space-y-6">

      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-100 p-4 rounded shadow flex gap-3">
          <CheckCircle className="text-green-600"/>
          Offer Updated Successfully
        </div>
      )}

      <div className="flex items-center gap-4">

        <Link to="/manage-offers">
          <ArrowLeft/>
        </Link>

        <h1 className="text-3xl font-bold">
          Edit Offer
        </h1>

      </div>

      <Card hover={false}>

        <div className="space-y-4">

          <input ref={promoRef} className="input-field" placeholder="Promo Code"/>

          <input ref={nameRef} className="input-field" placeholder="Offer Name"/>

          <input ref={discountRef} type="number" className="input-field" placeholder="Discount %"/>

          <input ref={validityRef} type="number" className="input-field" placeholder="Validity days"/>

          <select ref={statusRef} className="input-field">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

      </Card>

      <button
        onClick={updateOffer}
        disabled={loading}
        className="btn-primary w-full py-3"
      >
        {loading ? "Updating..." : "Update Offer"}
      </button>

    </div>

  );

};

export default EditOffers;