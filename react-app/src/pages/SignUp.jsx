import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/library/InputField";
import { signUpInputs } from "../data/dummy";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sends request to server in order to register new user
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setError(null);
    // setSuccess(null);
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }
    // try {
    //   const response = await fetch("/api/sign-up", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       email: formData.email,
    //       password: formData.password,
    //     }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setSuccess("Registration successful! Redirecting to login page...");
    //     setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    //     setTimeout(() => {
    //       navigate("/library/sign-in");
    //     }, 3000);
    //   } else {
    //     setError(data.message || "Registration failed.");
    //   }
    // } catch (error) {
    //   setError("An error occurred. Please try again later.");
    // }
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
        <form onSubmit={handleSubmit} className="sign-up">
          <div className="mb-12">
            <h3 className="sign-up__title">Register</h3>
          </div>

          {signUpInputs.map((input, index) => (
            <InputField
              key={index}
              label={input.label}
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
            />
          ))}

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="sign-up__submit">
            Register
          </button>

          <p className="text-gray-800 text-sm mt-8 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/library/sign-in")}
              className="text-blue-500 font-semibold hover:underline ml-1"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
