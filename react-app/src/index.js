import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./pages/routes/routes";
import { Provider } from "react-redux";
import { UserProvider } from "./contexts/UserContext";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Provider>
);
