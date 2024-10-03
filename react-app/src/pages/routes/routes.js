import { createBrowserRouter } from "react-router-dom";

import App from "../../App";
import Home from "../Home";
import Library from "../../components/library/Library";
import Auth from "../../components/auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      {
        index: true,
        component: <Home />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/:id",
        component: () => <h1>Book Page</h1>,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

export default router;
