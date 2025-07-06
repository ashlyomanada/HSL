import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "@/services/auth";
import Swal from "sweetalert2";

const RegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    setLoading(true);

    try {
      await register(form);

      Swal.fire("Success", "Account created successfully!", "success");
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
      });
    } catch (error) {
      console.error("Registration failed:", error);

      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire("Registration Failed", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:min-h-screen px-4 pt-28 pb-10">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 text-center text-3xl font-semibold">
            Register
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <input
                name="password_confirmation"
                type="password"
                className="input input-bordered w-full"
                placeholder="Confirm password"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Hidden or optional role field */}
            <input type="hidden" name="role" value={form.role} />

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-slate-600 ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create an account"}
            </button>
          </div>

          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
