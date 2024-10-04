import React from "react";
import "../../styles/components/auth/Reg-Log.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__box">
          <h1 className="login__title">LIBRARY</h1>
          <form className="login__form">
            <input
              type="email"
              placeholder="Your Email Address"
              className="login__input"
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              className="login__input"
              required
            />
            <button type="submit" className="login__submit">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
