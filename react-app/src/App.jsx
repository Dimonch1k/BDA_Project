import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/header/Header";

import { pageStyles, outletStyles } from "./styles/components/pages/appStyles";

function App() {
  return (
    <div style={pageStyles}>
      <ScrollRestoration />
      <Header />
      <div style={outletStyles}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
