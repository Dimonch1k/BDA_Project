import React from "react";
import "../../styles/components/auth/Auth.scss";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__box">
          <h1 className="auth__title">LIBRARY</h1>
          <form className="auth__form">
            <input
              type="text"
              placeholder="Your Name"
              className="auth__input"
              required
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="auth__input"
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              className="auth__input"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth__input"
              required
            />
            <button type="submit" className="auth__submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
