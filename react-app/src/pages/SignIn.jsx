import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputSign from "../components/library/Catalog/InputSign";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, resetSignIn } from "../store/slices/signinSlice";
import { useStateContext } from "../contexts/ContextProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.signin);
  const { loginUser } = useStateContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(formData));
  };

  useEffect(() => {
    if (success) {
      const userData = success;
      loginUser(userData);
      navigate("/library/");
    }
    return () => {
      dispatch(resetSignIn());
    };
  }, [success, dispatch, navigate, loginUser]);

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
          <InputSign
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <InputSign
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