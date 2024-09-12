import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import { NotFound } from "./component/404";
import Quotes from "./pages/Quotes/Quotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "quote/*",
        element: <Quotes />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
