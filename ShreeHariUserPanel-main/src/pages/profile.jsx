import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, Save } from "lucide-react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [user, setUser] = useState({ name: "", email: "", phone: "", address: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost/ShreeHari/getUserProfile.php?user_id=${user_id}`
      );
      if (res.data.status) setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost/ShreeHari/updateProfile.php", {
        user_id,
        ...user,
        password,
      });
      if (res.data.status) {
        alert("Profile Updated ✅");
        setPassword("");
      } else {
        alert("Update Failed ❌");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --g700: #15803d;
          --g500: #22c55e;
          --s900: #0f172a;
          --s700: #334155;
          --s500: #64748b;
          --s200: #e2e8f0;
          --s100: #f1f5f9;
          --s50:  #f8fafc;
          --white: #ffffff;
        }

        .profile-page {
          font-family: 'DM Sans', sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          padding: 48px 16px 80px;
        }

        .profile-wrap {
          max-width: 520px;
          margin: 0 auto;
        }

        /* Avatar Card */
        .profile-avatar-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #15803d, #22c55e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
        }

        .profile-avatar-name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--s900);
        }

        .profile-avatar-email {
          font-size: 0.85rem;
          color: var(--s500);
        }

        /* Form Card */
        .profile-form-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          padding: 25px;
        }

        .profile-form-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .pf-field {
          margin-bottom: 15px;
        }

        .pf-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--s700);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
        }

        .pf-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--s200);
          border-radius: 10px;
          font-size: 0.9rem;
          background: var(--s50);
        }

        .pf-input:focus {
          border-color: var(--g500);
          outline: none;
        }

        .pf-submit {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, var(--g700), var(--g500));
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          margin-top: 10px;
          cursor: pointer;
        }

        .pf-submit:disabled {
          opacity: 0.6;
        }
      `}</style>

      <div className="profile-page">
        <div className="profile-wrap">

          {/* Avatar */}
          <div className="profile-avatar-card">
            <div className="profile-avatar">{getInitials(user.name)}</div>
            <div>
              <div className="profile-avatar-name">{user.name}</div>
              <div className="profile-avatar-email">{user.email}</div>
            </div>
          </div>

          {/* Form */}
          <div className="profile-form-card">
            <div className="profile-form-title">Edit Profile</div>

            <div className="pf-field">
              <label className="pf-label"><User size={14}/> Name</label>
              <input className="pf-input" name="name" value={user.name} onChange={handleChange}/>
            </div>

            <div className="pf-field">
              <label className="pf-label"><Mail size={14}/> Email</label>
              <input className="pf-input" value={user.email} disabled/>
            </div>

            <div className="pf-field">
              <label className="pf-label"><Phone size={14}/> Phone</label>
              <input className="pf-input" name="phone" value={user.phone} onChange={handleChange}/>
            </div>

            <div className="pf-field">
              <label className="pf-label"><MapPin size={14}/> Address</label>
              <input className="pf-input" name="address" value={user.address} onChange={handleChange}/>
            </div>

            <div className="pf-field">
              <label className="pf-label"><Lock size={14}/> New Password</label>
              <input className="pf-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className="pf-submit" onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;