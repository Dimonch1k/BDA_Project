import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/library/InputField";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sends request to server in order to login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Login successful!");
        navigate("/library/dashboard");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="font-sans relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={require("../data/images/library.avif")}
          alt="Library Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit}
          className="sign-in bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-12">
            <h3 className="sign-in__title">Login</h3>
          </div>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="sign-in__submit">
            Login
          </button>

          <p className="text-gray-800 text-sm mt-8 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/library/sign-up")}
              className="text-blue-500 font-semibold hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
