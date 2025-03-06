import React, { useState } from "react";
import Link from "next/link";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "Joshua",
    lastName: "Bakare",
    email: "josh.bakery@gmail.com",
    password: "",
    role: "user",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);
      // Optionally redirect or clear form here
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Image Section */}
      <div className="relative w-1/2 bg-center bg-cover bg-[url('/Bitmap.png')]">
        <div className="flex absolute inset-0 justify-center items-end p-8 text-center text-white bg-black/30">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">No Hazzles</h2>
            <p className="mb-4 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
            <div className="flex justify-center mb-4 space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex justify-center items-center p-8 w-1/2 bg-white">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Create your free account
          </h1>
          <p className="mb-6 text-sm text-blue-700">
            Already registered?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="p-3 mb-4 bg-red-50 rounded-md border border-red-200">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-5 h-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Joshua"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bakare"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="josh.bakery@gmail.com"
                  required
                />
                <span className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2">
                  @
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-3 py-2 pr-10 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="********"
                  required
                />
                <span className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2">
                  🔒
                </span>
                <span className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2">
                  👁️
                </span>
              </div>
            </div>

            {/* Optional: Add role selection if needed */}
            <input type="hidden" name="role" value={formData.role} />

            <button
              type="submit"
              disabled={loading}
              className={`py-2 w-full text-white rounded-md transition-colors ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Registering..." : "Continue"}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </p>
          <p className="mt-1 text-xs text-center text-gray-500">
            © 2019 Tinylabs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
