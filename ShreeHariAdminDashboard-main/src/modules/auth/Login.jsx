import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { LogIn, Eye, EyeOff } from "lucide-react";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await axios.post(
        "http://localhost/ShreeHari/adminLogin.php",
        formData
      );

      const result = res.data;

      if (result.status === "true") {
        localStorage.setItem("admin", JSON.stringify(result));
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center px-12 text-white">
        <h1 className="text-5xl font-bold leading-tight">
          Shree Hari Agritech
        </h1>
        <p className="mt-4 text-lg text-white/80">
          Manage your business operations with a secure and modern admin panel.
        </p>

        <div className="mt-10 space-y-3 text-sm text-white/70">
          <p>✔ Secure Login</p>
          <p>✔ Fast Dashboard Access</p>
          <p>✔ Easy Management</p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-primary p-3 rounded-full mb-3">
              <LogIn className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Admin Login
            </h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to continue
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full mt-1 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-lg outline-none"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full mt-1 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary p-3 rounded-lg outline-none pr-10"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
