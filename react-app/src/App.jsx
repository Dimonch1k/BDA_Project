import { Outlet, Route, Routes, ScrollRestoration } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { pageStyles, outletStyles } from "./styles/components/pages/appStyles";
import Library from "./components/library/Library";
import Home from "./pages/Home";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";

function App() {
  return (
    <div style={pageStyles}>
      <ScrollRestoration />
      <Header />
      <div style={outletStyles}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
