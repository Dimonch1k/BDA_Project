import "../styles/pages/Sign.scss";
import library from "../data/images/library.avif";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputSign from "../components/library/Catalog/InputSign";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, resetSignIn } from "../store/slices/signinSlice";
import { setUserInfo } from "../store/slices/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.signin);
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
      dispatch(setUserInfo(userData));
      navigate("/library/");
    }
    return () => {
      dispatch(resetSignIn());
    };
  }, [success, dispatch, navigate]);

  return (
    <div className="sign-in">
      <div className="bg-img">
        <img src={library} alt="Library Bg" className="bg-img__img" />
      </div>
      <div className="sign-in__content">
        <form onSubmit={handleSubmit} className="sign-in__form">
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
          <p className="sign-in__text">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/library/sign-up")}
              className="sign-in__btn"
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
