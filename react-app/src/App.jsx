import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { pageStyles, outletStyles } from "./styles/components/pages/appStyles";

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
