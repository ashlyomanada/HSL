import { login } from "@/services/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(form);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: true,
        timer: 1500,
      });
      const role = response.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setLoading(true);
      if (error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong try again later.",
        });
      }
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 pt-10">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h1>
            <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    autoComplete="username"
                    type="email"
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={form.email}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    autoComplete="password"
                    type={isHidden ? "password" : "text"}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  {isHidden ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                      onClick={togglePasswordVisibility}
                    >
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 24 24"
                      onClick={togglePasswordVisibility}
                    >
                      <path d="M12 6c3.72 0 7.09 2.05 9 5.5-1.15 2.1-2.98 3.87-5.11 4.83l1.52 1.52c2.67-1.24 4.93-3.39 6.36-6.35-2.27-4.67-7-7.5-12-7.5a12.85 12.85 0 0 0-2.75.3l1.63 1.63C10.5 6.1 11.24 6 12 6zm10.19 15.19L3.81 2.81 2.39 4.22l2.49 2.49C3.26 8.44 1.7 10.79 1 12c2.27 4.67 7 7.5 12 7.5 2.07 0 4.06-.5 5.87-1.39l2.52 2.52 1.41-1.44zM12 18c-3.72 0-7.09-2.05-9-5.5a10.97 10.97 0 0 1 3.27-3.55l1.6 1.6a4.5 4.5 0 0 0 6.09 6.09l1.6 1.6c-.97.23-1.99.36-3.06.36zM9.1 12.03l2.87 2.87A2.5 2.5 0 0 1 9.1 12.03z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label className="ml-3 block text-sm text-slate-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-5 w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[darkBlue] hover:bg-blue-800 focus:outline-none cursor-pointer"
                  disabled={loading}
                >
                  {loading ? `Logging in` : "Sign in"}
                  {loading && (
                    <span className="loading loading-spinner loading-xs"></span>
                  )}
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
